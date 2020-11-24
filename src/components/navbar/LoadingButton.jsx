import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
	height: 68px;
	display: flex;
	align-items: center;
	margin-top: 0px;
	margin-bottom: 0px;
	margin-left: 5px;
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

export default LoadingButton;
