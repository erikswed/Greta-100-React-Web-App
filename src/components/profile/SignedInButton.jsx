import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Offline } from 'react-detect-offline';
import ProfilePageAuthenticated from './ProfilePageAuthenticated';
import ProfilePageAnonymous from './ProfilePageAnonymous';
import LinkAccounts from './LinkAccounts';
import SummaryPage from './SummaryPage';
import ContributePage from './ContributePage';

function SignedInButton() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Button className="button is-large" onClick={handleShow}>
				<span className="icon is-medium">
					<i className="fas fa-user" />
				</span>
			</Button>
			<Modal show={show} onHide={handleClose}>
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
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SignedInButton;
