import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUserSlice = createSelector([selectUser], user => user.currentUser);
