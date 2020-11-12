import React from 'react';
import '../../styles/profile-page-anonymous.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { AuthUserContext, withAuthorization } from '../../session';
import ChangeName from './ChangeName';
import * as ROLES from '../../constants/roles';

function ProfilePageBase({ authUser }) {
	return (
		<div>
			{authUser ? (
				<div>
					<div className="profileAnonymous">
						<table>
							<tbody>
								<tr>
									<td>Display name: </td>
									<td>{authUser.displayName}</td>
								</tr>
								<tr>
									<td>User ID: </td>
									<td>{authUser.uid}</td>
								</tr>
								<tr>
									<td>Anonymous: </td>
									<td>{authUser.isAnonymous ? 'True' : 'False'}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div>
						<h2>Change your display name</h2>
					</div>
					<div className="profileBoxChangeNameAnonymous">
						<ChangeName authUser={authUser} />
					</div>
				</div>
			) : (
				<p>Unable to get user details. Please try refreshing the page.</p>
			)}
		</div>
	);
}

const ProfilePageAnon = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div className="profilePageAnonymous">
				<ProfilePageBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ANON);

const enhance = compose(withAuthorization(condition), withFirebase);
const ProfilePageAnonymous = enhance(ProfilePageAnon);

export default ProfilePageAnonymous;
