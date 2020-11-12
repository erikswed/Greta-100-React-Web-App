import albumMetaDataActionTypes from './albumMetaData.types';

const initialState = {
	albumMeta: [],
	isGettingMetaData: false,
	albumMetaErrMsg: '',
};

export default function albumMetaDataReducer(state = initialState, action) {
	switch (action.type) {
		case albumMetaDataActionTypes.ALBUM_META_DATA_STARTED:
			return {
				...state,
				isGettingMetaData: true,
			};
		case albumMetaDataActionTypes.ALBUM_META_DATA_SUCCESS:
			return {
				...state,
				isGettingMetaData: false,
				albumMeta: action.payload,
			};
		case albumMetaDataActionTypes.ALBUM_META_DATA_FAILURE:
			return {
				...state,
				isGettingMetaData: false,
				albumMetaErrMsg: action.payload,
			};
		default:
			return state;
	}
}
