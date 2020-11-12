import React from 'react';

import AuthUserContext from './context';

const WithAuthorization = condition => Component => {
	class withAuthorization extends React.Component {
		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser => (condition(authUser) ? <Component {...this.props} /> : null)}
				</AuthUserContext.Consumer>
			);
		}
	}

	return withAuthorization;
};

export default WithAuthorization;
