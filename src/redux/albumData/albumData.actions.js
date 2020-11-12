import albumDataActionTypes from './albumData.types';

// starts album data Saga
export function getAlbumData() {
	return { type: albumDataActionTypes.ALBUM_DATA_REQUESTED };
}
