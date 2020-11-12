import React from 'react';
import '../../styles/profile-page-authenticated.css';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { AuthUserContext, withAuthorization } from '../../session';
import ChangeName from './ChangeName';
import * as ROLES from '../../constants/roles';

function getProviders(authUser) {
	const pro = authUser.providerData[0].providerId;
	if (pro === 'google.com') return authUser.providerData[0].email;
	if (pro === 'facebook.com' || pro === 'twitter.com') return pro;
	return 'non';
}

function ProfilePageBase({ authUser }) {
	const providers = getProviders(authUser);

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
									<td>Signed in with: </td>
									<td>{providers}</td>
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

const ProfilePageAuth = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div className="profilePageAuthenticated">
				<ProfilePageBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);

const enhance = compose(withAuthorization(condition), withFirebase);
const ProfilePageAuthenticated = enhance(ProfilePageAuth);

export default ProfilePageAuthenticated;
