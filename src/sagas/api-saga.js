import { takeEvery, call, put } from 'redux-saga/effects';
import {
	ALBUM_DATA_REQUESTED,
	RESUME_DATA_REQUESTED,
	ALBUMDATA_DATA_LOADED,
	RESUME_DATA_LOADED,
	API_ERRORED,
} from '../constants/action-types';

function getDataResume() {
	return fetch('/resume.json').then(response => response.json());
}

// Get's the App main json with text and doom list of all weeks and albumes
function* workerSagaResume() {
	try {
		const payload = yield call(getDataResume);
		yield put({ type: RESUME_DATA_LOADED, payload });
	} catch (e) {
		yield put({ type: API_ERRORED, payload: e });
	}
}

function getDataAlbumData() {
	return fetch('/albumData.json').then(response => response.json());
}

// Get's album json with all weeks
function* workerSagaAlbumData() {
	try {
		const payload = yield call(getDataAlbumData);
		yield put({ type: ALBUMDATA_DATA_LOADED, payload });
	} catch (e) {
		yield put({ type: API_ERRORED, payload: e });
	}
}

export default function* watcherSaga() {
	yield takeEvery(RESUME_DATA_REQUESTED, workerSagaResume);
	yield takeEvery(ALBUM_DATA_REQUESTED, workerSagaAlbumData);
}
