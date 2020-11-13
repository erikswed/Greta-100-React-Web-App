/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../../session';
import { withFirebase } from '../../firebase';
import { SIGN_IN_METHODS } from '../../constants/signinmethods';
import * as ROLES from '../../constants/roles';
import '../../styles/link-account.scss';
import { changeToUserRole } from '../../redux/userData/user.actions';

class LoginManagementBase extends Component {
	constructor() {
		super();
		this.state = {
			activeSignInMethods: [],
			anonymousSignIn: null,
			error: null,
		};
	}

	componentDidMount() {
		this.fetchSignInMethods();
	}

	fetchSignInMethods = () => {
		const { firebase, authUser } = this.props;
		const email = authUser.email === null ? 'none@guest.ac' : authUser.email;
		firebase.auth
			.fetchSignInMethodsForEmail(email)
			.then(activeSignInMethods =>
				this.setState({
					activeSignInMethods,
					anonymousSignIn: activeSignInMethods.length === 0,
					error: null,
				}),
			)
			.catch(error => this.setState({ error }));
	};

	onSocialLoginLink = provider => {
		const { firebase, changeUserRole } = this.props;
		firebase.auth.currentUser
			.linkWithPopup(firebase[provider])
			.then(res => {
				if (res.credential) {
					if (res.user.email) {
						firebase.doLogEvent(`linkWithPopup to Firestore for: ${res.user.email}`);
					} else {
						firebase.doLogEvent(`linkWithPopup to Firestore for: ${res.credential.providerId}`);
					}
					changeUserRole();
				}
			})
			.then(this.fetchSignInMethods)
			.catch(error => {
				if (error.code === 'auth/credential-already-in-use') {
					firebase.auth
						.signInWithCredential(error.credential)
						.then(res => {
							if (res.user.email) {
								firebase.doLogEvent(`signInWithCredential to Firestore for: ${res.user.email}`);
							} else {
								firebase.doLogEvent(`signInWithCredential to Firestore for: ${res.credential.providerId}`);
							}
							changeUserRole();
						})
						.catch(err => {
							this.setState(err.message);
						});
				} else {
					this.setState({ error });
				}
			});
	};

	onDefaultLoginLink = password => {
		const { firebase, authUser } = this.props;
		const credential = firebase.emailAuthProvider.credential(authUser.email, password);

		firebase.auth.currentUser
			.linkAndRetrieveDataWithCredential(credential)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	onUnlink = providerId => {
		const { firebase } = this.props;
		firebase.auth.currentUser
			.unlink(providerId)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	render() {
		const { activeSignInMethods, error } = this.state;
		const { saveRolesErr } = this.props;
		return (
			<div className="provideToggler">
				&nbsp;&nbsp;&nbsp;
				<div className="providerText">
					<h1>Sign in to access your account from anywhere!</h1>
				</div>
				&nbsp;
				<ul>
					{SIGN_IN_METHODS.map(signInMethod => {
						const onlyOneLeft = activeSignInMethods.length === 1;
						const isEnabled = activeSignInMethods.includes(signInMethod.id);
						return (
							<li key={signInMethod.id}>
								{signInMethod.id === 'password' ? (
									<DefaultLoginToggle
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onLink={this.onDefaultLoginLink}
										onUnlink={this.onUnlink}
									/>
								) : (
									<SocialLoginToggle
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onLink={this.onSocialLoginLink}
										onUnlink={this.onUnlink}
									/>
								)}
							</li>
						);
					})}
				</ul>
				<h1 style={{ color: 'red' }}>
					{error && error.message}
					{saveRolesErr && saveRolesErr.message}
				</h1>
			</div>
		);
	}
}

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) =>
	isEnabled ? (
		<button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
			Unlink <i className={signInMethod.icon} aria-hidden="true" /> {signInMethod.name} sign in
		</button>
	) : (
		<button type="button" onClick={() => onLink(signInMethod.provider)}>
			Link <i className={signInMethod.icon} aria-hidden="true" /> {signInMethod.name} sign in
		</button>
	);

// TODO This is not in use but might use it later
class DefaultLoginToggle extends Component {
	constructor() {
		super();
		this.state = { passwordOne: '', passwordTwo: '' };
	}

	onSubmit = event => {
		const { passwordOne } = this.state;
		const { onLink } = this.props;
		event.preventDefault();
		onLink(passwordOne);
		this.setState({ passwordOne: '', passwordTwo: '' });
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { signInMethod } = this.props;
		const { passwordOne, passwordTwo } = this.state;
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
		return (
			<form onSubmit={this.onSubmit}>
				Link <i className={signInMethod.icon} aria-hidden="true" /> {signInMethod.name} sign in
				<input
					name="passwordOne"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="Password for email sign in"
				/>
				<input
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Confirm New Password"
				/>
				<button disabled={isInvalid} type="submit">
					Save password for email sign in
				</button>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	changeUserRole: () => dispatch(changeToUserRole()),
});

const mapStateToProps = state => {
	return {
		isSavingRole: state.user.isSavingRoles,
		saveRolesErr: state.user.saveRolesErrMsg,
	};
};

const enhance = compose(withFirebase, connect(mapStateToProps, mapDispatchToProps));
const LoginManagement = enhance(LoginManagementBase);
const LinkAccounts = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<LoginManagement authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ANON);
export default withAuthorization(condition)(LinkAccounts);
