import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Dots from 'react-activity/lib/Dots';
import Page from '../../utils/Page';
import MotionDiv from '../../utils/MotionDiv';
import * as ROLES from '../../../../constants/roles';
import { withEmailVerification, withAuthorization, AuthUserContext } from '../../../../session';
import { withFirebase } from '../../../../firebase';
import { changeToUserRole } from '../../../../redux/userData/user.actions';

const useStyles = theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		minHeight: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	Container: {
		backgroundColor: theme.palette.primary.main,
		paddingTop: theme.spacing(3),
	},
	button: {
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[5],
	},
});

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class RegisterViewBase extends React.Component {
	constructor() {
		super();
		this.state = {
			error: null,
			registerRunning: false,
		};
	}

	onSubmit = event => {
		const { firebase, setUserRoleToUser } = this.props;
		const { firstName, lastName, email, password } = event;
		const credential = firebase.emailAuthProvider.credential(email, password);
		this.setState({ registerRunning: true });
		firebase.auth.currentUser
			.linkWithCredential(credential)
			.then(authUser => {
				console.log('Anonymous account successfully upgraded', authUser);
				firebase.doLogEvent('login', { method: 'linkWithCredential password' });
				if (process.env.NODE_ENV !== 'production')
					console.log(`Sucessfully signed in to Firebase with password, UID: ${authUser.uid}`);
				// At this stage user is signed in but still ANON because Email verification must be done first
				firebase
					.userDoc(authUser.user.uid)
					.set(
						{
							createdate: firebase.fieldValue.serverTimestamp(),
							firstName,
							lastName,
							email,
							password,
						},
						{ merge: true },
					)
					.then(() => {
						setUserRoleToUser();
						console.log('User datat updated at Firestore!');
					})
					.catch(error => {
						console.log(`Could not save user to Firestore! ${error.code}`);
					});
			})
			.then(() => {
				return firebase.doSendEmailVerification();
			})
			.catch(error => {
				if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERROR_MSG_ACCOUNT_EXISTS;
				}
				this.setState({ error, registerRunning: false });
			});
		event.preventDefault();
	};

	render() {
		const { classes } = this.props;
		const { error, registerRunning } = this.state;

		return (
			<MotionDiv>
				<Page className={classes.root} title="Register">
					<Box display="flex" flexDirection="column" height="100%" justifyContent="center">
						<Container maxWidth="sm" className={classes.Container}>
							<Formik
								initialValues={{
									email: '',
									firstName: '',
									lastName: '',
									password: '',
									policy: false,
								}}
								validationSchema={Yup.object().shape({
									email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
									firstName: Yup.string().max(255).required('First name is required'),
									lastName: Yup.string().max(255).required('Last name is required'),
									password: Yup.string().max(255).required('password is required'),
									policy: Yup.boolean().oneOf([true], 'This field must be checked'),
								})}
								onSubmit={(values, { setSubmitting }) => {
									setSubmitting(false);
									this.onSubmit(values);
								}}
							>
								{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
									<form onSubmit={handleSubmit}>
										<Box mb={3}>
											<Typography color="textPrimary" variant="h2">
												Create new account
											</Typography>
											<Typography color="textSecondary" gutterBottom variant="body2">
												Use your email to create new account
											</Typography>
										</Box>
										<TextField
											error={Boolean(touched.firstName && errors.firstName)}
											fullWidth
											helperText={touched.firstName && errors.firstName}
											label="First name"
											margin="normal"
											name="firstName"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.firstName}
											variant="outlined"
										/>
										<TextField
											error={Boolean(touched.lastName && errors.lastName)}
											fullWidth
											helperText={touched.lastName && errors.lastName}
											label="Last name"
											margin="normal"
											name="lastName"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.lastName}
											variant="outlined"
										/>
										<TextField
											error={Boolean(touched.email && errors.email)}
											fullWidth
											helperText={touched.email && errors.email}
											label="Email Address"
											margin="normal"
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											type="email"
											value={values.email}
											variant="outlined"
										/>
										<TextField
											error={Boolean(touched.password && errors.password)}
											fullWidth
											helperText={touched.password && errors.password}
											label="Password"
											margin="normal"
											name="password"
											onBlur={handleBlur}
											onChange={handleChange}
											type="password"
											value={values.password}
											variant="outlined"
										/>
										<Box alignItems="center" display="flex" ml={-1}>
											<Checkbox checked={values.policy} name="policy" onChange={handleChange} />
											<Typography color="textSecondary" variant="body1">
												I have read the{' '}
												<span role="article">
													<a
														target="_blank"
														rel="noopener noreferrer"
														href="http://greta.portplays.com/Privacy%20Policy.html"
													>
														Privacy Policy
													</a>
												</span>
											</Typography>
										</Box>
										<Box alignItems="center" display="flex" ml={-1}>
											<Checkbox checked={values.policy} name="Terms" onChange={handleChange} />
											<Typography color="textSecondary" variant="body1">
												I have read the{' '}
												<span role="article">
													<a
														target="_blank"
														rel="noopener noreferrer"
														href="http://greta.portplays.com/Terms%20of%20Service.html"
													>
														Terms and Conditions
													</a>
												</span>
											</Typography>
										</Box>
										{Boolean(touched.policy && errors.policy) && <FormHelperText error>{errors.policy}</FormHelperText>}
										<Box my={2}>
											<Button
												className={classes.button}
												disabled={isSubmitting}
												fullWidth
												size="large"
												type="submit"
												variant="contained"
												color="primary"
											>
												Sign up now
											</Button>
										</Box>
										<Typography color="textSecondary" variant="body1">
											Have an account?{' '}
											<Link color="textSecondary" component={RouterLink} to="../login" variant="h6">
												Sign in!
											</Link>
										</Typography>
									</form>
								)}
							</Formik>
							<div>{registerRunning ? <Dots /> : null}</div>
							<h1 style={{ margin: '8px', color: 'red', textAlign: 'center', backgroundColor: 'white' }}>
								{error && error.message}
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

let RegisterManagement = withStyles(useStyles)(RegisterViewBase);
const enhance = compose(withFirebase, withEmailVerification, connect(null, mapDispatchToProps));
RegisterManagement = enhance(RegisterManagement);

const RegisterView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<RegisterManagement authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ANON);
export default withAuthorization(condition)(RegisterView);
