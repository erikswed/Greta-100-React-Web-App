import { combineReducers } from 'redux';
import userReducer from './userData/user.reducer';
import albumReducer from './albumData/albumData.reducer';
import albumMetaDataReducer from './albumMetaData/albumMetaData.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	albums: albumReducer,
	albumMetaData: albumMetaDataReducer,
});

export default rootReducer;
