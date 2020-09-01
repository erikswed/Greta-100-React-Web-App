import { ALBUMDATA_DATA_LOADED, RESUME_DATA_LOADED } from '../constants/action-types';

const initialState = {
	articles: [],
	remoteArticles: [],
	remoteAlbumData: [],
};

export default function reducer(state = initialState, action) {
	if (action.type === RESUME_DATA_LOADED) {
		return { ...state, remoteArticles: action.payload };
	}

	if (action.type === ALBUMDATA_DATA_LOADED) {
		return { ...state, remoteAlbumData: action.payload };
	}
	return state;
}
