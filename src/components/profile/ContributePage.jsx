import React from 'react';
import '../../styles/contribute-page.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { AuthUserContext, withAuthorization } from '../../session';
import * as ROLES from '../../constants/roles';

class ContributePageBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: props.authUser.displayName ?? '', // TODO work in progress
		};
	}

	render() {
		let userDetails;
		const { authUser } = this.props;
		if (authUser) {
			userDetails = (
				<div>
					{' '}
					&nbsp;&nbsp;&nbsp;
					<div>
						<h2>Your Dashboard </h2>
						<h2>(Under Construction spoilerplate!)</h2>
					</div>
					<div className="contributeBoxSummary">
						<table>
							<tbody>
								<tr>
									<td>Add multiple files images, movies, text or other files.</td>
									<td>
										<button className="contributeButton buttons" onSubmit={this.onSubmit} type="submit">
											Add Items
										</button>
									</td>
								</tr>
								<tr>
									<td>Add an Article: </td>
									<td>
										<button className="contributeButton buttons" onSubmit={this.onSubmit} type="submit">
											Add Article
										</button>
									</td>
								</tr>
								<tr>
									<td>View your contribution summery: </td>
									<td>
										<button className="contributeButton buttons" onSubmit={this.onSubmit} type="submit">
											Contribution
										</button>
									</td>
								</tr>
								<tr>
									<td>View your engagements: </td>
									<td>
										<button className="contributeButton buttons" onSubmit={this.onSubmit} type="submit">
											Engagements
										</button>
									</td>
								</tr>
								<tr>
									<td>Order Coffee: </td>
									<td>
										<button className="contributeButton buttons" onSubmit={this.onSubmit} type="submit">
											Coffee
										</button>
									</td>
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

const ContributePageAuth = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div className="contributePageSummary">
				<ContributePageBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);

const enhance = compose(withAuthorization(condition), withFirebase);
const ContributePage = enhance(ContributePageAuth);

export default ContributePage;
