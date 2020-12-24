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
				authUser: null,
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
					const roles = [];
					roles.push(ROLES.ANON);
					firebase
						.doSignInAnonymously()
						.then(authUser => {
							localStorage.setItem('isUserAnon', 'true');
							if (process.env.NODE_ENV !== 'production')
								console.log(`Sucessfully signed in to Firebase Anonymously with UID: ${firebase.getCurrentUserUid()}`);
							firebase.doLogEvent('login', { method: 'Anonymous' });
							firebase
								.userDoc(authUser.user.uid)
								.set({
									displayName: `User-${authUser.user.uid.substring(0, 6)}`,
									roles,
									createdate: firebase.fieldValue.serverTimestamp(),
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
			// User from Firebase user listener
			const { currentUser } = this.props;
			// User from state
			let { authUser } = this.state;
			// Changes made must be saved localy
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
