import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import * as ROLES from '../constants/roles';
import { setCurrentUser, startUserListener } from '../redux/userData/user.actions';
import { selectUserSlice } from '../redux/userData/user.selectors';

const WithAuthentication = Component => {
	class withAuthentication extends React.Component {
		constructor() {
			super();
			this.state = {
				authUser: JSON.parse(localStorage.getItem('authUser')),
				once: true,
			};
		}

		componentDidMount() {
			const { firebase, setUser, startUserListen } = this.props;
			this.authListener = firebase.onAuthUserListener(
				authUser => {
					this.setState({ authUser });
					setUser(authUser);
					startUserListen();
				},
				() => {
					localStorage.removeItem('authUser');
					this.setState({ authUser: null });
					const roles = [];
					roles.push(ROLES.ANON);
					firebase
						.doSignInAnonymously()
						.then(authUser => {
							if (process.env.NODE_ENV !== 'production')
								console.log(`Sucessfully signed in to Firebase Anonymously with UID: ${firebase.getCurrentUserUid()}`);
							firebase.doLogEvent('login', { method: 'Anonymous' });
							firebase
								.userDoc(authUser.user.uid)
								.set({
									displayName: `User-${authUser.user.uid.substring(0, 6)}`,
									roles,
									date: firebase.fieldValue.serverTimestamp(),
								})
								.then(() => {
									console.log('New user saved to Firestore!');
								})
								.catch(error => {
									console.log(`Could not save user to Firestore! ${error.code}`);
								});
						})
						.catch(error => {
							console.error(`Failed to sign in to Firebase: ${error.code} - ${error.message}`);
						});
				},
			);
		}

		componentWillUnmount() {
			this.authListener();
		}

		render() {
			const { currentUser } = this.props;
			let { authUser } = this.state;
			// ALl changes to user object will trigger an update
			if (currentUser) authUser = currentUser;
			return (
				<AuthUserContext.Provider value={authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}

	withAuthentication.whyDidYouRender = true;

	const mapDispatchToProps = dispatch => ({
		setUser: authUser => dispatch(setCurrentUser(authUser)),
		startUserListen: () => dispatch(startUserListener()),
	});

	const mapStateToProps = state => {
		return {
			currentUser: selectUserSlice(state),
		};
	};

	return compose(connect(mapStateToProps, mapDispatchToProps), withFirebase)(withAuthentication);
};

export default WithAuthentication;
