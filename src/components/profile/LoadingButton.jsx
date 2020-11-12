import React from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/loadingbutton.scss';

function LoadingButton() {
	return (
		<div className="iconButton">
			<Button className="button is-large">
				<span className="icon is-medium">
					<i className="fas fa-spinner fa-spin" />
				</span>
			</Button>
		</div>
	);
}

export default LoadingButton;
