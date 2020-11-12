import { all, fork } from 'redux-saga/effects';
import albumSaga from './albumData/albumData-saga';
import albumMetaSaga from './albumMetaData/albumMetaData-saga';
import watchUserRequests from './userData/user-saga';

export default function* () {
	yield all([fork(albumSaga), fork(albumMetaSaga), fork(watchUserRequests)]);
}
