import { takeEvery, call, put } from 'redux-saga/effects';
import albumMetaDataActionTypes from './albumMetaData.types';

function getMetaData() {
	return fetch('/resume.json').then(response => response.json());
}

function* workerSagaMetaData() {
	yield put({ type: albumMetaDataActionTypes.ALBUM_META_DATA_STARTED });

	try {
		const payload = yield call(getMetaData);
		yield put({ type: albumMetaDataActionTypes.ALBUM_META_DATA_SUCCESS, payload });
	} catch (e) {
		yield put({ type: albumMetaDataActionTypes.ALBUM_META_DATA_FAILURE, payload: e });
	}
}

export default function* watcherSaga() {
	yield takeEvery(albumMetaDataActionTypes.ALBUM_META_DATA_REQUESTED, workerSagaMetaData);
}
