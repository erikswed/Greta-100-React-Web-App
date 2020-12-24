import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUserSlice = createSelector([selectUser], user => user.currentUser);

export const savingRequestAdminRoleSlice = createSelector([selectUser], user => user.isSavingRequestAdminRoleStarted);
export const savingRequestAdminRoleSuccessSlice = createSelector([selectUser], user => user.isRequestAdminRole);
export const changeRequestAdminRoleErrSlice = createSelector([selectUser], user => user.RequestAdminRoleErrMsg);
