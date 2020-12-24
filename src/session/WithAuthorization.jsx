/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AuthUserContext from './context';

const WithAuthorization = condition => Component => {
	return props => {
		return (
			<AuthUserContext.Consumer>
				{authUser => (condition(authUser) ? <Component {...props} /> : null)}
			</AuthUserContext.Consumer>
		);
	};
};

export default WithAuthorization;
