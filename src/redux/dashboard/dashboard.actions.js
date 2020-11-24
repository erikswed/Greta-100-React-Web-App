import dashboardActionTypes from './dashboard.types';

export const showDashboard = ({ dashboardProps }) => dispatch => {
	dispatch({
		type: dashboardActionTypes.SHOW_DASHBOARD,
		dashboardProps,
	});
};

export const hideDashboard = () => dispatch => {
	dispatch({
		type: dashboardActionTypes.HIDE_DASHBOARD,
	});
};
