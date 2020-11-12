import { userActionTypes } from './user.types';

const INIT_STATE = {
	isSavingRoles: false,
	currentUser: null,
	saveRolesErrMsg: '',
	isSavingDisplayName: false,
	displayName: '',
	changeDisplayNameErrMsg: '',
};

const userReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		// CHANGE_TO_USER_ROLE
		case userActionTypes.CHANGE_TO_USER_ROLE_START:
			return {
				...state,
				isSavingRoles: true,
			};
		case userActionTypes.CHANGE_TO_USER_ROLE_SUCCESS:
			return {
				...state,
				isSavingRoles: false,
			};
		case userActionTypes.CHANGE_TO_USER_ROLE_FAILURE:
			return {
				...state,
				isSavingRoles: false,
				saveRolesErrMsg: action.payload,
			};
		// CHANGE_DISPLAY_NAME
		case userActionTypes.CHANGE_DISPLAY_NAME_START:
			return {
				...state,
				isSavingDisplayName: true,
			};
		case userActionTypes.CHANGE_DISPLAY_NAME_SUCCESS:
			return {
				...state,
				isSavingDisplayName: false,
				displayName: action.payload,
			};
		case userActionTypes.CHANGE_DISPLAY_NAME_FAILURE:
			return {
				...state,
				isSavingDisplayName: false,
				changeDisplayNameErrMsg: action.payload,
			};
		// SET_CURRENT_USER
		case userActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		// UPDATE_LOCAL_USER
		case userActionTypes.UPDATE_LOCAL_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
