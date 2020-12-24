import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Card, Container, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import * as SIGN_IN from '../constants/signinmethods';

const useStyles = theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
	},
	sendButton: {
		marginRight: theme.spacing(1),
		boxShadow: theme.shadows[5],
	},
	cardContent: {
		backgroundColor: theme.palette.primary.main,
	},
	textField: {
		backgroundColor: theme.palette.primary.light,
	},
});

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

		needsEmailVerification = user => {
			const needs =
				user &&
				!user.emailVerified &&
				user.providerData.map(provider => provider.providerId).includes(SIGN_IN.WITH_PASSWORD.id);
			return needs;
		};

		contentSelector = (isSent, authUser) => {
			const { classes } = this.props;
			let text;
			if (isSent) {
				text = (
					<p>
						E-Mail confirmation sent: Check you E-Mails (Spam folder included) for a confirmation E-Mail. Refresh this
						page once you confirmed your E-Mail.
					</p>
				);
			} else {
				text = (
					<p>
						Verify your E-Mail: Check you E-Mails (Spam folder included) for a confirmation E-Mail or send another
						confirmation E-Mail.
					</p>
				);
			}
			return (
				<div className={classes.root}>
					<Container maxWidth={false}>
						<Grid>
							<Card className={classes.cardContent}>
								<CardContent>
									<CardContent>
										<Typography gutterBottom variant="h4" component="h2" color="textSecondary">
											E-mail Verification
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											{text}
										</Typography>
									</CardContent>
									You are signing in with an E-mail and password and Before you can gain access the E-mail{' '}
									{authUser ? authUser.email : ''} must be verified!
								</CardContent>
							</Card>
						</Grid>
						<Grid container spacing={24}>
							<Grid item lg={4}>
								<Box display="flex" justifyContent="flex-start">
									<CardContent>
										<Button
											onClick={this.onSendEmailVerification}
											disabled={isSent}
											color="primary"
											variant="contained"
											className={classes.sendButton}
										>
											Send confirmation E-Mail again
										</Button>
									</CardContent>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</div>
			);
		};

		render() {
			const { isSent } = this.state;
			return (
				<AuthUserContext.Consumer>
					{authUser =>
						this.needsEmailVerification(authUser) ? (
							<div>{this.contentSelector(isSent, authUser)}</div>
						) : (
							<Component {...this.props} />
						)
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	return compose(withFirebase, withStyles(useStyles))(withEmailVerification);
};

export default WithEmailVerification;
