import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
	makeStyles,
} from '@material-ui/core';
import { Offline } from 'react-detect-offline';
import ChangeName from './ChangeName';
import { AuthUserContext } from '../../../../../session';
import RequestAdminCheckBox from './RequestAdminCheckBox';
import * as ROLES from '../../../../../constants/roles';
import * as SIGN_IN from '../../../../../constants/signinmethods';

const user = {
	avatar: '/static/images/avatars/avatar_6.png',
	city: 'Los Angeles',
	country: 'USA',
	jobTitle: 'Senior Developer',
	name: 'Katarina Smith',
	timezone: 'GTM-7',
};

const useStyles = makeStyles(theme => ({
	root: {},
	avatar: {
		height: 100,
		width: 100,
	},
	cardContent: {
		backgroundColor: theme.palette.primary.main,
	},
}));

function getProviders(authUser) {
	if (!Array.isArray(authUser.providerData) || !authUser.providerData.length) return 'non';
	const pro = authUser.providerData[0].providerId;
	if (pro === SIGN_IN.WITH_GOOGLE.id) return authUser.providerData[0].email;
	if (pro === SIGN_IN.WITH_FACEBOOK.id || pro === SIGN_IN.WITH_TWITTER.id || pro === SIGN_IN.WITH_PASSWORD.id)
		return pro;
	return 'non-error';
}

const ProfileBase = ({ authUser, className, ...rest }) => {
	const classes = useStyles();
	return (
		<div>
			<Offline>
				<div
					style={{
						position: 'relative',
						left: '50%',
						top: '1%',
						transform: 'translate(-50%, -50%)',
						color: 'red',
					}}
				>
					It appears you don't have an active Internet connection!
				</div>
			</Offline>
			{authUser ? (
				<Card className={clsx(classes.root, className, classes.cardContent)} {...rest}>
					<CardContent>
						<Box alignItems="center" display="flex" flexDirection="column">
							<Avatar className={classes.avatar} src={user.avatar} />
							<Typography color="textPrimary" gutterBottom variant="h3" paddingBottom={2}>
								{authUser ? authUser.displayName : ''}
							</Typography>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Signed in with {getProviders(authUser)}
							</Typography>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<Typography color="textPrimary" gutterBottom variant="h6">
								Change your display name
							</Typography>
							<div className={classes.changeName}>
								<ChangeName authUser={authUser} />
							</div>
						</Box>
						<Divider />
					</CardContent>
					<CardContent>
						<Box alignItems="left" display="flex" flexDirection="column">
							<Typography color="textSecondary" variant="body2" component="div">
								ROLES:
								{!authUser ? (
									''
								) : (
									<div>
										{authUser.roles.map(role => (
											<li key={role}>{role}</li>
										))}
									</div>
								)}
							</Typography>
						</Box>
					</CardContent>
					{!authUser.roles.includes(ROLES.ADMIN) ? (
						<div>
							<Divider />
							<CardContent>
								<div className={classes.changeName}>
									<RequestAdminCheckBox authUser={authUser} />
								</div>
							</CardContent>
						</div>
					) : (
						<div>{undefined}</div>
					)}
					<Divider />
					<CardActions>
						<Button color="primary" fullWidth variant="text">
							Upload picture
						</Button>
					</CardActions>
				</Card>
			) : (
				<p>Unable to get user details. Please try refreshing the page.</p>
			)}
		</div>
	);
};

ProfileBase.propTypes = {
	className: PropTypes.string,
};

ProfileBase.defaultProps = {
	className: '',
};

const Profile = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<ProfileBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

export default Profile;
