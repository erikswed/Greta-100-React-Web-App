import dashboardActionTypes from './dashboard.types';

const initialState = {
	dashboardProps: {
		open: false,
	},
};

export default function dashboardReducer(state = initialState, action) {
	switch (action.type) {
		case dashboardActionTypes.SHOW_DASHBOARD:
			return {
				dashboardProps: action.dashboardProps,
				type: action.type,
			};
		case dashboardActionTypes.HIDE_DASHBOARD:
			return initialState;
		default:
			return state;
	}
}
