import { RESUME_DATA_REQUESTED, ALBUM_DATA_REQUESTED } from '../constants/action-types';

export function getData() {
	return { type: RESUME_DATA_REQUESTED };
}

export function getAlbumData() {
	return { type: ALBUM_DATA_REQUESTED };
}
