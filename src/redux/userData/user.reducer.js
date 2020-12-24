import { userActionTypes } from './user.types';

const INIT_STATE = {
	currentUser: null,

	isSavingRolesStarted: false,
	isSavingRoles: false,
	saveRolesErrMsg: '',

	isSavingRequestAdminRoleStarted: false,
	isRequestAdminRole: false,
	RequestAdminRoleErrMsg: '',

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
				isSavingRolesStarted: true,
			};
		case userActionTypes.CHANGE_TO_USER_ROLE_SUCCESS:
			return {
				...state,
				isSavingRoles: false,
				isSavingRolesStarted: false,
			};
		case userActionTypes.CHANGE_TO_USER_ROLE_FAILURE:
			return {
				...state,
				isSavingRoles: false,
				isSavingRolesStarted: false,
				saveRolesErrMsg: action.payload,
			};
		// CHANGE_REQUEST_ADMIN_ROLE
		case userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_START:
			return {
				...state,
				isSavingRequestAdminRoleStarted: true,
			};
		case userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_SUCCESS:
			return {
				...state,
				isRequestAdminRole: true,
				isSavingRequestAdminRoleStarted: false,
			};
		case userActionTypes.CHANGE_REQUEST_ADMIN_ROLE_FAILURE:
			return {
				...state,
				isRequestAdminRole: false,
				isSavingRequestAdminRoleStarted: false,
				RequestAdminRoleErrMsg: action.payload,
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
