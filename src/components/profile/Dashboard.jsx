import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Offline } from 'react-detect-offline';
import styled from 'styled-components';
import ProfilePageAuthenticated from './ProfilePageAuthenticated';
import ProfilePageAnonymous from './ProfilePageAnonymous';
import LinkAccounts from './LinkAccounts';
import SummaryPage from './SummaryPage';
import ContributePage from './ContributePage';

const Dashboard = props => {
	const { dashProps } = props;
	const { open, closeDashboard } = dashProps;

	function closeModal() {
		closeDashboard();
	}

	return (
		<div>
			<Modal show={open} onHide={closeModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>User Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ProfilePageAuthenticated />
					<ProfilePageAnonymous />
					<LinkAccounts />
					<SummaryPage />
					<ContributePage />
					<Offline>
						<div
							style={{
								marginTop: 40,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'red',
							}}
						>
							It appears you don't have an active Internet connection!
						</div>
					</Offline>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		dashProps: state.dashboard.dashboardProps,
	};
};
export default connect(mapStateToProps, null)(Dashboard);

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
