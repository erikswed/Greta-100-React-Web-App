import { takeEvery, call, put } from 'redux-saga/effects';
import albumDataActionTypes from './albumData.types';

function getMetaData() {
	return fetch('/albumData.json').then(response => response.json());
}

function* workerSagaAlbumData() {
	yield put({ type: albumDataActionTypes.ALBUM_DATA_STARTED });

	try {
		const payload = yield call(getMetaData);
		yield put({ type: albumDataActionTypes.ALBUM_DATA_SUCCESS, payload });
	} catch (e) {
		yield put({ type: albumDataActionTypes.ALBUM_DATA_FAILURE, payload: e });
	}
}

export default function* watcherSaga() {
	yield takeEvery(albumDataActionTypes.ALBUM_DATA_REQUESTED, workerSagaAlbumData);
}
