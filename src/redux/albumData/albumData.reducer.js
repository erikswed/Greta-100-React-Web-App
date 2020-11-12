import albumDataActionTypes from './albumData.types';

const initialState = {
	album: [],
	isGettingAlbumData: false,
	albumDataErrMsg: '',
};

export default function albumDataReducer(state = initialState, action) {
	switch (action.type) {
		case albumDataActionTypes.ALBUM_DATA_STARTED:
			return {
				...state,
				isGettingAlbumData: true,
			};
		case albumDataActionTypes.ALBUM_DATA_SUCCESS:
			return {
				...state,
				isGettingAlbumData: false,
				album: action.payload,
			};
		case albumDataActionTypes.ALBUM_DATA_FAILURE:
			return {
				...state,
				isGettingAlbumData: false,
				albumDataErrMsg: action.payload,
			};
		default:
			return state;
	}
}

