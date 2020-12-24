import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WithDashboardNavigate from '../../session/WithDashboardNavigate';
import { AuthUserContext } from '../../session';
import * as ROLES from '../../constants/roles';

function SignedInButtonBase(props) {
	const navigate = useNavigate();
	const { authUser } = props;

	function openDashboard() {
		props.dashboardNavigater(navigate);
	}

	return (
		<div>
			{authUser ? (
				<div>
					{Array.isArray(authUser.roles) && authUser.roles.includes(ROLES.USER) ? (
						<div>
							<Button className="button is-large" onClick={openDashboard}>
								<span className="icon is-medium">
									<i className="fas fa-user" />
								</span>
							</Button>
						</div>
					) : (
						<div>
							<Button className="button is-large" onClick={openDashboard}>
								<span className="icon is-medium">
									<i className="fas fa-user" />
								</span>
								<span>Sign In</span>
							</Button>
						</div>
					)}
				</div>
			) : null}
		</div>
	);
}

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
const SignedInButtonEnhanced = WithDashboardNavigate(SignedInButtonBase);
const SignedInButto = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<SignedInButtonEnhanced authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

export default SignedInButto;
