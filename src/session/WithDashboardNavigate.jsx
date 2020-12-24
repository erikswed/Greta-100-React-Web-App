import React from 'react';
import AuthUserContext from './context';
import * as ROLES from '../constants/roles';
import * as NAVIGATE_ROUTES from '../constants/navigateRoutes';

const WithDashboardNavigate = Component => {
	const WithDashboardBase = props => {
		const onDashboard = navigate => {
			const { authUser } = props;
			if (authUser) {
				if (authUser.roles.includes(ROLES.ANON)) {
					navigate(NAVIGATE_ROUTES.LOGIN.path);
				} else if (authUser.roles.includes(ROLES.USER) || authUser.roles.includes(ROLES.ADMIN)) {
					const view = localStorage.getItem('currentDashBoardView');
					// Here if user has used nav menu earlier then that last view is loaded
					if (view) navigate(view);
					// or default to dash
					else navigate(NAVIGATE_ROUTES.DASHBOARD.path);
				}
			}
		};

		return <Component dashboardNavigater={onDashboard} {...props} />;
	};

	const WithDashboard = (
		props, // Pass props from here as well
	) => (
		<AuthUserContext.Consumer>
			{authUser => (
				<div>
					<WithDashboardBase authUser={authUser} {...props} />
				</div>
			)}
		</AuthUserContext.Consumer>
	);

	return WithDashboard;
};

export default WithDashboardNavigate;
