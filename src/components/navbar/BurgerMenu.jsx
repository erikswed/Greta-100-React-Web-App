import React from 'react';
import styled from 'styled-components';

const Burgermenu = props => {
	const { toggleCollapseMenu, show } = props;

	return (
		<Wrapper onClick={toggleCollapseMenu}>
			<div className={show ? 'open' : ''}>
				<div className="burgerMenu">
					<span className="burgerMenu">&nbsp;</span>
					<span className="burgerMenu">&nbsp;</span>
					<span className="burgerMenu">&nbsp;</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default Burgermenu;

const Wrapper = styled.div`
	position: relative;
	padding-top: 0.7rem;
	cursor: pointer;
	display: block;
	z-index: 100000;

	& span {
		background: #fdcb6e;
		display: block;
		position: relative;
		width: 3.5rem;
		height: 0.4rem;
		margin-bottom: 0.7rem;
		transition: all ease-in-out 0.2s;
	}

	.open span:nth-child(2) {
		opacity: 0;
	}

	.open span:nth-child(3) {
		transform: rotate(45deg);
		top: -17px;
	}

	.open span:nth-child(1) {
		transform: rotate(-45deg);
		top: 17px;
	}
`;
