/* eslint-disable import/prefer-default-export */
import { userActionTypes } from './user.types';
import * as ROLES from '../../constants/roles';

// Save user role
const changeToUserRoleStart = () => ({
	type: userActionTypes.CHANGE_TO_USER_ROLE_START,
});

const changeToUserRoleSuccess = user => ({
	type: userActionTypes.CHANGE_TO_USER_ROLE_SUCCESS,
	payload: user,
});

const changeToUserRoleFailure = errMsg => ({
	type: userActionTypes.CHANGE_TO_USER_ROLE_FAILURE,
	payload: errMsg,
});

export function changeToUserRole() {
	return (dispatch, getState, firebase) => {
		const userRef = firebase.userDoc(firebase.auth.currentUser.uid);
		dispatch(changeToUserRoleStart());
		firebase.db
			.runTransaction(transaction => {
				// This code may get re-run multiple times if there are conflicts.
				return transaction.get(userRef).then(doc => {
					if (!doc.exists) {
						return Promise.reject('Transaction failed: User dont exist!');
					}
					const newRoles = doc.data().roles;
					// new roll
					newRoles.push(ROLES.USER);
					// remove roll
					newRoles.splice(newRoles.indexOf('ANONYMOUS'), 1);
					// save it back
					transaction.update(userRef, { roles: newRoles });
					return newRoles;
				});
			})
			.then(newRoles => {
				dispatch(changeToUserRoleSuccess(firebase.auth.currentUser));
				console.log(`Transaction successfully committed role(s): ${newRoles}`);
			})
			.catch(error => {
				dispatch(changeToUserRoleFailure(error));
				console.log(`Transaction failed committing role(s): ${error}`);
			});
	};
}

// Save User display name
const changeDisplayNameStart = () => ({
	type: userActionTypes.CHANGE_DISPLAY_NAME_START,
});

const changeDisplayNameSuccess = name => ({
	type: userActionTypes.CHANGE_DISPLAY_NAME_SUCCESS,
	payload: name,
});

const changeDisplayNameFailure = errMsg => ({
	type: userActionTypes.CHANGE_DISPLAY_NAME_FAILURE,
	payload: errMsg,
});

export function changeDisplayName(newDisplayName) {
	return (dispatch, getState, firebase) => {
		const userRef = firebase.userDoc(firebase.auth.currentUser.uid);
		dispatch(changeDisplayNameStart());
		userRef
			.update({
				displayName: newDisplayName,
			})
			.then(() => {
				if (process.env.NODE_ENV !== 'production')
					console.log(`Sucessfully updated user displayName to: ${newDisplayName}`);
				firebase.doLogEvent(`Sucessfully updated user displayName to ${newDisplayName}`);
				return newDisplayName;
			})
			.then(() => {
				dispatch(changeDisplayNameSuccess(newDisplayName));
			})
			.catch(error => {
				dispatch(changeDisplayNameFailure(`Failed to update user displayName: ${error.code} - ${error.message}`));
			});
	};
}

// Change Request Admin Role
const changeRequestAdminRoleStart = () => ({
	type: userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_START,
});

const changeRequestAdminRoleSuccess = change => ({
	type: userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_SUCCESS,
	payload: change,
});

const changeRequestAdminRoleFailure = errMsg => ({
	type: userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_FAILURE,
	payload: errMsg,
});

export function changeRequestAdminRole(change) {
	return (dispatch, getState, firebase) => {
		const userRef = firebase.userDoc(firebase.auth.currentUser.uid);
		dispatch(changeRequestAdminRoleStart());
		userRef
			.update({
				requestAdminRole: change,
			})
			.then(() => {
				if (process.env.NODE_ENV !== 'production')
					console.log(`Sucessfully requested admin role for: ${firebase.auth.currentUser.uid}`);
				firebase.doLogEvent(`Sucessfully requested admin role for: ${firebase.auth.currentUser.uid}`);
				return change;
			})
			.then(() => {
				dispatch(changeRequestAdminRoleSuccess(change));
			})
			.catch(error => {
				dispatch(changeRequestAdminRoleFailure(`Failed to request admin role: ${error.code} - ${error.message}`));
			});
	};
}

// set user
export const setCurrentUser = authUser => ({
	type: userActionTypes.SET_CURRENT_USER,
	payload: authUser,
});

// starts the user event listener in Saga
export const startUserListener = () => {
	return { type: userActionTypes.LISTEN_CURRENT_USER };
};

// update local user data with Firestore user data
export const updateLocalUser = dbUser => {
	return { type: userActionTypes.UPDATE_LOCAL_USER, payload: dbUser };
};
