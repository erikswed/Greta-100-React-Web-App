import { createSelector } from 'reselect';

const selectDashboardMeta = state => state.dashboard;

export const selectDashboardMetaSlice = createSelector([selectDashboardMeta], dashboardProps => dashboardProps);
