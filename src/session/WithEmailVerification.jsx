import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';

const needsEmailVerification = user =>
	user &&
	!user.authUser.emailVerified &&
	user.authUser.providerData.map(provider => provider.providerId).includes('password');

const WithEmailVerification = Component => {
	class withEmailVerification extends React.Component {
		constructor() {
			super();
			this.state = { isSent: false };
		}

		onSendEmailVerification = () => {
			const { firebase } = this.props;
			firebase.doSendEmailVerification().then(() => this.setState({ isSent: true }));
		};

		render() {
			const { isSent } = this.state;
			return (
				<AuthUserContext.Consumer>
					{user =>
						needsEmailVerification(user) ? (
							<div>
								{isSent ? (
									<p>
										E-Mail confirmation sent: Check you E-Mails (Spam folder included) for a confirmation E-Mail.
										Refresh this page once you confirmed your E-Mail.
									</p>
								) : (
									<p>
										Verify your E-Mail: Check you E-Mails (Spam folder included) for a confirmation E-Mail or send
										another confirmation E-Mail.
									</p>
								)}

								<button type="button" onClick={this.onSendEmailVerification} disabled={isSent}>
									Send confirmation E-Mail
								</button>
							</div>
						) : (
							<Component {...this.props} />
						)
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	return withFirebase(withEmailVerification);
};

export default WithEmailVerification;
