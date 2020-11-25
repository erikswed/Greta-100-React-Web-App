import React from 'react';
import '../../styles/summary-page.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { AuthUserContext, withAuthorization } from '../../session';
import * as ROLES from '../../constants/roles';

class SummaryPageBase extends React.PureComponent {
	render() {
		let userDetails;
		const { authUser } = this.props;
		if (authUser) {
			userDetails = (
				<div>
					{' '}
					&nbsp;&nbsp;&nbsp;
					<div>
						<h2>Contribution Summary </h2>
					</div>
					<div className="profileBoxSummary">
						<table>
							<tbody>
								<tr>
									<td>Your Album uploads: </td>
									<td>0</td>
								</tr>
								<tr>
									<td>Your Articles uploads: </td>
									<td>0</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			);
		} else {
			userDetails = <p>Unable to get user details. Please try refreshing the page.</p>;
		}

		return <div>{userDetails}</div>;
	}
}

const SummaryPageAuth = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div className="profilePageSummary">
				<SummaryPageBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);

const enhance = compose(withAuthorization(condition), withFirebase);
const SummaryPage = enhance(SummaryPageAuth);

export default SummaryPage;
