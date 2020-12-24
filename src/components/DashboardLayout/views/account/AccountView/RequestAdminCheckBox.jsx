import React from 'react';
import { connect } from 'react-redux';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { changeRequestAdminRole } from '../../../../../redux/userData/user.actions';
import {
	savingRequestAdminRoleSlice,
	savingRequestAdminRoleSuccessSlice,
	changeRequestAdminRoleErrSlice,
} from '../../../../../redux/userData/user.selectors';

const styles = theme => ({
	root: {},
	changenRequestClass: {
		backgroundColor: theme.palette.primary.light,
		textAlign: 'center',
		padding: '0px',
		margin: 'auto',
	},
});

class RequestAdminCheckBox extends React.Component {
	onSubmit = event => {
		event.preventDefault();
		this.updateRequest();
	};

	updateRequest() {
		const { authUser, changeRequestAdminRoles } = this.props;
		changeRequestAdminRoles(!authUser.requestAdminRole);
	}

	render() {
		const { classes } = this.props;
		const { authUser, savingRequestAdminRole, savingRequestAdminRoleSuccess, changeRequestAdminRoleErr } = this.props;
		return (
			<div>
				<div className={classes.changenRequestClass}>
					<FormControlLabel
						value="Request to have an Admin Role"
						control={<Checkbox checked={authUser.requestAdminRole} onChange={this.onSubmit} />}
						label="Request to have an Admin Role"
						labelPlacement="right"
					/>
					{changeRequestAdminRoleErr && <p className="error">{changeRequestAdminRoleErr.message}</p>}
					{savingRequestAdminRoleSuccess && <p className="error">Request was sent!</p>}
				</div>
				<div>{savingRequestAdminRole ? <Dots /> : null}</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	changeRequestAdminRoles: checked => dispatch(changeRequestAdminRole(checked)),
});

const mapStateToProps = state => {
	return {
		savingRequestAdminRole: savingRequestAdminRoleSlice(state),
		savingRequestAdminRoleSuccess: savingRequestAdminRoleSuccessSlice(state),
		changeRequestAdminRoleErr: changeRequestAdminRoleErrSlice(state),
	};
};
const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps));
export default enhance(RequestAdminCheckBox);
