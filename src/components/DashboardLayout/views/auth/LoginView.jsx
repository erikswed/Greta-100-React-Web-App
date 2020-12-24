import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dots from 'react-activity/lib/Dots';
import { withFirebase } from '../../../../firebase';
import FacebookIcon from '../../../../assets/Facebook';
import GoogleIcon from '../../../../assets/Google';
import TwitterIcon from '../../../../assets/twitter-logo';
import Page from '../../utils/Page';
import MotionDiv from '../../utils/MotionDiv';
import { withEmailVerification, withAuthorization, AuthUserContext } from '../../../../session';
import { changeToUserRole } from '../../../../redux/userData/user.actions';
import * as ROLES from '../../../../constants/roles';
import 'react-activity/lib/Dots/Dots.css';
import * as SIGN_IN from '../../../../constants/signinmethods';

const useStyles = theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		minHeight: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	container: {
		backgroundColor: theme.palette.primary.main,
		paddingTop: theme.spacing(3),
	},
	textField: {
		boxShadow: theme.shadows[3],
		backgroundColor: theme.palette.primary.light,
	},
	facebook: {
		backgroundColor: '#3b5999',
		color: 'white',
		'&:hover': {
			backgroundColor: '#4d70ba',
		},
	},
	google: {
		backgroundColor: '#ffffff',
		textColor: 'black',
	},
	twitter: {
		backgroundColor: '#ffffff',
		textColor: 'black',
	},
	signInButton: {
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[5],
	},
});

const INITIAL_EMAIL_STATE = {
	email: '',
	password: '',
	error: null,
	message: '',
	isSubmitting: false,
};

class LoginManagementBase extends React.Component {
	constructor() {
		super();
		this.state = {
			...INITIAL_EMAIL_STATE,
		};
		this.facebookSignIn = this.facebookSignIn.bind(this);
		this.googleSignIn = this.googleSignIn.bind(this);
		this.twitteSignIn = this.twitteSignIn.bind(this);
	}

	onSocialLoginLink = provider => {
		const { firebase, setUserRoleToUser } = this.props;
		firebase.auth.currentUser
			.linkWithPopup(firebase[provider])
			.then(res => {
				if (res.credential) {
					if (res.user.email) {
						firebase.doLogEvent(`linkWithPopup to Firestore for: ${res.user.email}`);
					} else {
						firebase.doLogEvent(`linkWithPopup to Firestore for: ${res.credential.providerId}`);
					}
					setUserRoleToUser();
				}
			})
			.then(this.fetchSignInMethods)
			.catch(error => {
				if (error.code === 'auth/credential-already-in-use') {
					const anonUser = firebase.auth.currentUser;
					firebase.auth
						.signInWithCredential(error.credential)
						.then(res => {
							if (res.user.email) {
								firebase.doLogEvent(`signInWithCredential to Firestore for: ${res.user.email}`);
							} else {
								firebase.doLogEvent(`signInWithCredential to Firestore for: ${res.credential.providerId}`);
							}
							setUserRoleToUser();
							// remove the anonUser implications?
							// TODO: As anonymouse the User can't change the content(viewer only) so removing should not be a problem
							anonUser
								.delete()
								.then(() => {
									firebase.doLogEvent(`Deleted anonUser when signing in`);
								})
								.catch(err => {
									firebase.doLogEvent(`Error deleted anonUser when signing in: ${err}`);
									firebase.doLogEvent(`Manually remove anon account: ${anonUser.uid}`);
								});
						})
						.catch(error => {
							this.setState({ error, isSubmitting: false });
						});
				} else if (error.code === 'auth/email-already-in-use') {
					error.message = `The email address ${error.email} is already in use by another account.`;
					this.setState({ error, isSubmitting: false });
				} else {
					this.setState({ error, isSubmitting: false });
				}
			});
	};

	googleSignIn = () => {
		this.setState({
			isSubmitting: true,
		});
		this.onSocialLoginLink(SIGN_IN.WITH_GOOGLE.provider);
	};

	facebookSignIn = () => {
		this.setState({
			isSubmitting: true,
		});
		this.onSocialLoginLink(SIGN_IN.WITH_FACEBOOK.provider);
	};

	twitteSignIn = () => {
		this.setState({
			isSubmitting: true,
		});
		this.onSocialLoginLink(SIGN_IN.WITH_TWITTER.provider);
	};

	emailSignIn = () => {
		const { email, password } = this.state;
		const { firebase } = this.props;

		firebase.auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_EMAIL_STATE });
				// this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				this.setState({ error, isSubmitting: false });
			});
	};

	mailHandle = e => {
		const mailValue = e.target.value;
		this.setState({
			email: mailValue,
		});
	};

	passwordHandle = e => {
		const passwordValue = e.target.value;
		this.setState({
			password: passwordValue,
		});
	};

	chekvalid = () => {
		const { email, password } = this.state;
		const isEmailValid = this.ValidEmail(email);
		const isPasswordValid = this.ValidPass(password);
		if (password.length === 0 && email.length === 0) {
			this.setState({
				error: 'Enter E-Mail and Password to continue!',
			});
		}
		if (!isPasswordValid) {
			this.setState({
				message: 'Password should have more then 5 character',
			});
		}
		if (email.length === 0) {
			this.setState({
				message: 'Enter an E-Mail to continue!',
			});
		}
		if (password.length === 0) {
			this.setState({
				message: 'Enter an Password to continue!',
			});
		}
		if (!isEmailValid) {
			this.setState({
				message: 'E-Mail is not valid!',
			});
		}
		if (isEmailValid && isPasswordValid) {
			this.setState({
				message: '',
				isSubmitting: true,
			});
			this.emailSignIn();
		}
	};

	ValidEmail = email => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	ValidPass = email => {
		if (email.length > 5) {
			return true;
		}
		return false;
	};

	render() {
		const { classes } = this.props;
		const { message, error, email, password, isSubmitting } = this.state;
		const { saveRolesErr, isSavingRolesStarted } = this.props;
		if (error && error.message) {
			console.log(error.message);
		}
		return (
			<MotionDiv>
				<Page className={classes.root} title="Sign In">
					<Box display="flex" flexDirection="column" height="100%" justifyContent="center">
						<Container maxWidth="sm" className={classes.container}>
							<Box mb={3}>
								<Typography color="textPrimary" variant="h2">
									Sign in
								</Typography>
								<Typography color="textSecondary" gutterBottom variant="body2">
									Sign in on the internal platform
								</Typography>
							</Box>
							<Grid container spacing={3}>
								<Grid item xs={12} md={6}>
									<Button
										className={classes.facebook}
										disabled={isSubmitting}
										fullWidth
										startIcon={<FacebookIcon />}
										type="submit"
										onClick={this.facebookSignIn}
										size="large"
										variant="contained"
									>
										SIGN in with Facebook
									</Button>
								</Grid>
								<Grid item xs={12} md={6}>
									<Button
										className={classes.google}
										disabled={isSubmitting}
										fullWidth
										type="submit"
										startIcon={<GoogleIcon />}
										onClick={this.googleSignIn}
										size="large"
										variant="contained"
									>
										Sign in with Google
									</Button>
								</Grid>
								<Grid item xs={12} md={6}>
									<Button
										className={classes.twitter}
										disabled={isSubmitting}
										fullWidth
										type="submit"
										startIcon={<TwitterIcon />}
										onClick={this.twitteSignIn}
										size="large"
										variant="contained"
									>
										Sign in with Twitter
									</Button>
								</Grid>
							</Grid>
							<Box mt={3} mb={1}>
								<Typography align="center" color="textSecondary" variant="body1">
									or login with email address
								</Typography>
							</Box>
							<form noValidate autoComplete="off">
								<TextField
									className={classes.textField}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={email}
									onChange={this.mailHandle}
									color="secondary"
								/>
							</form>
							<form noValidate autoComplete="off">
								<TextField
									className={classes.textField}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={password}
									onChange={this.passwordHandle}
									color="secondary"
								/>
							</form>
							<Box my={2}>
								<Button
									disabled={isSubmitting}
									className={classes.signInButton}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									color="primary"
									onClick={this.chekvalid}
								>
									Sign in now
								</Button>
							</Box>
							<Typography color="textSecondary" variant="body1">
								Don&apos;t have an account?{' '}
								<Link color="textSecondary" component={RouterLink} to="../register" variant="h6">
									Sign up!
								</Link>
							</Typography>

							<div>{isSavingRolesStarted ? <Dots /> : null}</div>
							<h1 style={{ margin: '8px', color: 'red', textAlign: 'center', backgroundColor: 'white' }}>
								{message}
								{error && error.message}
								{saveRolesErr && saveRolesErr.message}
							</h1>
						</Container>
					</Box>
				</Page>
			</MotionDiv>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setUserRoleToUser: () => dispatch(changeToUserRole()),
});

const mapStateToProps = state => {
	return {
		isSavingRolesStarted: state.user.isSavingRolesStarted,
		saveRolesErr: state.user.saveRolesErrMsg,
	};
};
let LoginManagement = withStyles(useStyles)(LoginManagementBase);
const enhance = compose(withFirebase, connect(mapStateToProps, mapDispatchToProps), withEmailVerification);

LoginManagement = enhance(LoginManagement);

const LoginView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<LoginManagement authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ANON);
export default withAuthorization(condition)(LoginView);
