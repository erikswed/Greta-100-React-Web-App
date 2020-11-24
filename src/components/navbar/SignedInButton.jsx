import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { showDashboard, hideDashboard } from '../../redux/dashboard/dashboard.actions';

function SignedInButton(props) {
	function closeDashboard() {
		props.hideDash();
	}

	function openDashboard() {
		props.showDash({
			open: true,
			closeDashboard,
		});
	}

	return (
		<div>
			<Button className="button is-large" onClick={openDashboard}>
				<span className="icon is-medium">
					<i className="fas fa-user" />
				</span>
			</Button>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	hideDash: () => dispatch(hideDashboard()),
	showDash: dashboardProps => {
		dispatch(showDashboard({ dashboardProps }));
	},
});

const Button = styled.button`
	height: 68px;
	display: flex;
	align-items: center;
	margin-top: 0px;
	margin-bottom: 0px;
	margin-left: 5px;
	color: var(--button-text-color);
	padding: 0 1rem;
	justify-content: space-between;
	background: var(--button-background);
	border-radius: 6px;
	&:hover {
		background: var(--button-hover-background);
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
export default connect(null, mapDispatchToProps)(SignedInButton);
