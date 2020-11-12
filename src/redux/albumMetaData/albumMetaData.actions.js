import albumMetaDataActionTypes from './albumMetaData.types';

// starts album meta data Saga
export function getMetaData() {
	return { type: albumMetaDataActionTypes.ALBUM_META_DATA_REQUESTED };
}