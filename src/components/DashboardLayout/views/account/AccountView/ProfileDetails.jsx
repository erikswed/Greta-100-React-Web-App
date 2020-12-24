import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, makeStyles } from '@material-ui/core';
import { AuthUserContext } from '../../../../../session';
import * as SIGN_IN from '../../../../../constants/signinmethods';

const states = [
	{
		value: 'alabama',
		label: 'Alabama',
	},
	{
		value: 'new-york',
		label: 'New York',
	},
	{
		value: 'san-francisco',
		label: 'San Francisco',
	},
];

const useStyles = makeStyles(theme => ({
	root: {},
	cardContent: {
		backgroundColor: theme.palette.primary.main,
	},
	card: {
		backgroundColor: theme.palette.primary.main,
	},
	saveButton: {
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[5],
		border: 'none',
		borderRadius: '2px',
		color: 'white',
		margin: '5px',
		padding: '8px',
		fontSize: '12pt',
		cursor: 'pointer',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: theme.palette.primary.light,
		},
		'&:active': {
			cursor: 'pointer',
			backgroundColor: theme.palette.primary.light,
		},
		'&:disabled': {
			cursor: 'default',
			color: 'gray',
			backgroundColor: theme.palette.primary.main,
		},
	},
}));

const createFromAuth = authUser => {
	const id = authUser.providerData[0].providerId;
	const providerData = authUser.providerData[0];
	if (id === SIGN_IN.WITH_PASSWORD.id) {
		return {
			uid: providerData.uid,
			displayNameAnon: authUser.displayName,
			displayName: authUser.displayName,
			providerId: providerData.providerId,
			photoURL: providerData.photoURL,
			firstName: providerData.firstName,
			lastName: providerData.lastName,
			email: providerData.email,
			phone: providerData.phone,
			state: providerData.state,
			country: providerData.country,
			password: providerData.password,
		};
	}
	if (id === SIGN_IN.WITH_FACEBOOK.id || id === SIGN_IN.WITH_TWITTER.id || id === SIGN_IN.WITH_GOOGLE.id) {
		return {
			uid: providerData.uid,
			displayNameAnon: authUser.displayName,
			displayName: providerData.displayName,
			providerId: providerData.providerId,
			photoURL: providerData.photoURL,
			firstName: providerData.firstName,
			lastName: providerData.lastName,
			email: providerData.email,
			phone: providerData.phone,
			state: providerData.state,
			country: providerData.country,
		};
	}
};

const ProfileDetailsBase = ({ authUser, className, ...rest }) => {
	const classes = useStyles();
	const providerData = createFromAuth(authUser);

	const [values, setValues] = useState({
		displayNameAnon: authUser.displayName,
		providerId: providerData.providerId,
		photoURL: providerData.photoURL,
		displayName: providerData.displayName,

		firstName: providerData.firstName,
		lastName: providerData.lastName,
		email: providerData.email,
		phone: providerData.phone,
		state: providerData.state,
		country: providerData.country,
	});

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
			<Card className={classes.card}>
				<CardHeader
					subheader="The information can be edited (this is for now only a prop not working!)"
					title="Profile"
				/>
				<Divider />
				<CardContent className={classes.cardContent}>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								helperText="Please specify the first name"
								label="First name"
								name="firstName"
								onChange={handleChange}
								required
								value={values.firstName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Last name"
								name="lastName"
								onChange={handleChange}
								required
								value={values.lastName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Email Address"
								name="email"
								onChange={handleChange}
								required
								value={values.email}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Phone Number"
								name="phone"
								onChange={handleChange}
								type="number"
								value={values.phone}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Country"
								name="country"
								onChange={handleChange}
								required
								value={values.country}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Select State"
								name="state"
								onChange={handleChange}
								required
								select
								SelectProps={{ native: true }}
								value={values.state}
								variant="outlined"
							>
								{states.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button color="primary" variant="contained" disabled className={classes.saveButton}>
						Save details
					</Button>
				</Box>
			</Card>
		</form>
	);
};

ProfileDetailsBase.propTypes = {
	className: PropTypes.string,
};

ProfileDetailsBase.defaultProps = {
	className: '',
};

const ProfileDetails = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<ProfileDetailsBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

export default ProfileDetails;
