import React from 'react';
import { connect } from 'react-redux';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { changeDisplayName } from '../../../../../redux/userData/user.actions';

const styles = theme => ({
	root: {},
	changenameClass: {
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
		padding: '0px',
		margin: 'auto',
	},
	changeNameFormInput: {
		textAlign: 'left',
		padding: '8px',
		margin: '5px',
		border: 'none',
		borderRadius: '2px',
		fontSize: '12pt',
	},
	changeNameButton: {
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[5],
		border: 'none',
		borderRadius: '2px',
		color: 'white',
		margin: '5px',
		padding: '8px',
		cursor: 'pointer',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: theme.palette.primary.dark,
		},
		'&:active': {
			cursor: 'pointer',
			backgroundColor: theme.palette.primary.dark,
		},
		'&:disabled': {
			cursor: 'default',
			color: 'gray',
			backgroundColor: theme.palette.primary.main,
		},
	},
});

class ChangeName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
		};
	}

	onSubmit = event => {
		event.preventDefault();
		this.updateUserName();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	updateUserName() {
		const { displayName } = this.state;
		const { changeUserDisplayName } = this.props;
		changeUserDisplayName(displayName.trim());
	}

	render() {
		let { displayName } = this.state;
		const { classes } = this.props;

		const { authUser, savingDisplayName, newDisplayName, changeDisplayNameErr } = this.props;
		// initiate displayName
		displayName = displayName === '' ? authUser.displayName : displayName;
		const isInvalid = !displayName || !displayName.trim() || displayName.trim().length > 20;
		const isAmended = displayName && displayName.trim() !== authUser.displayName;
		return (
			<div>
				<div className={classes.changenameClass}>
					<form onSubmit={this.onSubmit} className={classes.changeNameFormInput}>
						<input
							name="displayName"
							value={displayName}
							onChange={this.onChange}
							type="text"
							maxLength="20"
							placeholder="Display name"
						/>
						<Button
							color="primary"
							className={classes.changeNameButton}
							disabled={isInvalid || !isAmended}
							type="submit"
							variant="contained"
							size="small"
						>
							Confirm
						</Button>
						{isInvalid && <p className="error">Display name must be between 1 and 20 characters in length</p>}
						{changeDisplayNameErr && <p className="error">{changeDisplayNameErr.message}</p>}
						{newDisplayName && <p className="error">New name was saved!</p>}
					</form>
				</div>
				<div>{savingDisplayName ? <Dots /> : null}</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	changeUserDisplayName: displayName => dispatch(changeDisplayName(displayName)),
});

const mapStateToProps = state => {
	return {
		savingDisplayName: state.user.isSavingDisplayName,
		newDisplayName: state.user.displayName,
		changeDisplayNameErr: state.user.changeDisplayNameErrMsg,
	};
};
const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps));
export default enhance(ChangeName);
