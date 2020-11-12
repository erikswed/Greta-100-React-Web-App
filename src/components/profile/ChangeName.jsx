import React from 'react';
import '../../styles/change-name.css';
import { connect } from 'react-redux';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
import { changeDisplayName } from '../../redux/userData/user.actions';

class ChangeName extends React.Component {
	constructor(props) {
		super(props);
		const { authUser } = this.props;
		this.state = {
			displayName: authUser.displayName ?? '',
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
		const { displayName } = this.state;
		const { authUser, savingDisplayName, newDisplayName, changeDisplayNameErr } = this.props;
		const isInvalid = !displayName || !displayName.trim() || displayName.trim().length > 20;
		const isAmended = displayName && displayName.trim() !== authUser.displayName;
		return (
			<div>
				<div className="changename">
					<form onSubmit={this.onSubmit}>
						<input
							name="displayName"
							value={displayName}
							onChange={this.onChange}
							type="text"
							maxLength="20"
							placeholder="Display name"
						/>
						<button className="changenamebutton" disabled={isInvalid || !isAmended} type="submit">
							Confirm
						</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);
