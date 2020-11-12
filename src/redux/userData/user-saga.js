// import { AsyncStorage } from 'react-native';
import { eventChannel } from 'redux-saga';
import { takeLatest, all, put, call, fork, take, takeEvery, cancel, cancelled, getContext } from 'redux-saga/effects';
// import firebase from 'react-native-firebase';

import { updateLocalUser } from './user.actions';
import { userActionTypes } from './user.types';

// function* updateUserSaga(action) {
// 	// multi path update
// 	const batch = firebase.firestore().batch();

// 	const ref = yield call(getUserRef);
// 	batch.update(ref, action.user);

// 	try {
// 		if (!action.user.displayName) return;
// 		const chatRefArray = [];
// 		const w = yield call([firebase.firestore(), firebase.firestore().collection], 'conversations');
// 		const g = yield call([w, w.where], 'teacherId', '==', firebase.auth().currentUser.uid);
// 		const chatRefs = yield call([g, g.get]);
// 		chatRefs.forEach(chatRef => chatRefArray.push(chatRef.id));
// 		console.log(chatRefArray);
// 		chatRefArray.forEach(reference => {
// 			const chatRef = firebase.firestore().collection('conversations').doc(reference);
// 			console.log(chatRef);
// 			batch.update(chatRef, { teacherName: action.user.displayName });
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	yield call([batch, batch.commit]);
// }

function* userListenerSaga() {
	const firebase = yield getContext('firebase');
	if (!firebase.auth.currentUser) {
		return;
	}
	/* sync the user from the cloud and store it on the device
  also call the getUserSaga to update the user reducer state with the latest user data */
	const ref = firebase.userDoc(firebase.getCurrentUserUid());
	if (!ref) {
		console.log('no ref');
		// yield cancel(fcmTokenSaga);
		yield cancel();
	}
	// Start FCM Token Saga if ref is not null
	// yield fork(fcmTokenSaga);
	// get the event channel
	const channel = yield call(userEventListener, ref);
	// while there is a user logged in...
	try {
		while (true) {
			// get the data emitted from the channel
			const user = yield take(channel);
			let authUser = firebase.auth.currentUser;
			authUser = {
				uid: authUser.uid,
				email: authUser.email,
				emailVerified: authUser.emailVerified,
				providerData: authUser.providerData,
				isAnonymous: authUser.isAnonymous,
				...user,
			};
			// update the user reducer
			yield put(updateLocalUser(authUser));

			// if (yield take(actionTypes.AUTH.LOGOUT.SUCCESS)) {
			// 	console.log('er');
			// 	yield cancel();
			// 	return;
			// }
		}
	} catch (error) {
		console.log(error);
	} finally {
		if (yield cancelled()) {
			console.log('erer');
			channel.close();
		}
	}
}

const userEventListener = ref => {
	// create a redux saga event channel to listen for changes to the user data on the cloud
	const channel = eventChannel(emitter => {
		// call the onSnapshot listener function in firestore and emit the user data
		const unsubscribe = ref.onSnapshot(doc => emitter(doc.data()));
		return unsubscribe;
	});
	// return the event channel
	return channel;
};

// function* fcmTokenSaga() {
// 	let token = yield call([firebase.messaging(), firebase.messaging().getToken]);
// 	console.log('FCM Token: ', token);
// 	yield call(updateUserSaga, { user: { fcmToken: token } });

// 	const channel = yield call(fcmTokenListener);

// 	try {
// 		while (firebase.auth().currentUser) {
// 			token = yield take(channel);
// 			yield call(updateUserSaga, { user: { fcmToken: token } });
// 			if (yield take(actionTypes.AUTH.LOGOUT.SUCCESS)) {
// 				yield cancel();
// 				return;
// 			}
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		if (yield cancelled()) channel.close();
// 	}
// }

// const fcmTokenListener = () => {
// 	return eventChannel(emitter => {
// 		const unsub = firebase.messaging().onTokenRefresh(token => {
// 			console.log(token);
// 			emitter(token);
// 		});
// 		return unsub;
// 	});
// };

export default function* watchUserRequests() {
	yield takeLatest(userActionTypes.LISTEN_CURRENT_USER, userListenerSaga);
	// takeEvery(actionTypes.USER.UPDATE, updateUserSaga),
}
