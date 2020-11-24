import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Offline } from 'react-detect-offline';
import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import { AuthUserContext } from '../../session';
import LoadingButton from './LoadingButton';
import SignedInButton from './SignedInButton';

const Navbar = props => {
	const [show, setCollapseMenuState] = useState(false);

	const barAnimation = useSpring({
		from: { transform: 'translate3d(0, -10rem, 0)' },
		transform: 'translate3d(0, 0, 0)',
	});

	const handleCollapseMenu = () => {
		setCollapseMenuState(!show);
	};

	const onArticlesPageClick = () => {
		const node = document.getElementById('scroll-to-articles');
		node.scrollIntoView({ behavior: 'smooth' });
	};

	const onAboutePageClick = () => {
		const node = document.getElementById('scroll-to-aboutMe');
		node.scrollIntoView({ behavior: 'smooth' });
	};

	const onTimelinePageClick = () => {
		const node = document.getElementById('scroll-to-timeline');
		node.scrollIntoView({ behavior: 'smooth' });
	};

	const { visible } = props;

	return (
		<>
			<Transition>
				<NavBar style={barAnimation} className={`navbar ${!visible ? 'hidden' : 'active'}`}>
					<Offline>
						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '1%',
								transform: 'translate(-50%, -50%)',
								color: 'red',
							}}
						>
							It appears you don't have an active Internet connection!
						</div>
					</Offline>
					<BurgerWrapper>
						<BurgerMenu show={show} toggleCollapseMenu={handleCollapseMenu} />
					</BurgerWrapper>
					<FlexContainer>
						<Brand />
						<Input type="text" placeholder="Search Title, Events or Dates" className="mr-sm-2" />
						<Button onClick={onArticlesPageClick} variant="primary">
							Articles
						</Button>
						<Button onClick={onTimelinePageClick} variant="primary">
							Timeline
						</Button>
						<Button onClick={onAboutePageClick} variant="primary">
							About
						</Button>
						<AuthUserContext.Consumer>
							{authUser => (authUser ? <SignedInButton /> : <LoadingButton />)}
						</AuthUserContext.Consumer>
					</FlexContainer>
					<FlexContainerUnder1184px>
						<Brand />
						<Input type="text" placeholder="Search Title, Events or Dates" className="mr-sm-2" />
					</FlexContainerUnder1184px>
					<FlexContainerUnder768px>
						<Brand />
						<Input type="text" placeholder="Search Title, Events or Dates" className="mr-sm-2" />
					</FlexContainerUnder768px>
					<FlexContainerUnder590px>
						<Input type="text" placeholder="Search Title, Events or Dates" className="mr-sm-2" />
					</FlexContainerUnder590px>
				</NavBar>
				<CollapseMenu show={show} close={handleCollapseMenu} />
			</Transition>
		</>
	);
};

export default Navbar;

const Transition = styled.div`
	.active {
		transition: top 0.6s;
		opacity: 0.95;
		filter: alpha(opacity=30); /* For IE8 and earlier */
	}
	.hidden {
		transition: top 0.9s;
		top: -150px;
	}
`;

const NavBar = styled(animated.nav)`
	position: fixed;
	width: 100%;
	top: 10px;
	left: 0;
	background: var(--menu-background-color);
	z-index: 110;
	font-size: 1.4rem;
`;

const FlexContainer = styled.div`
	max-width: 120rem;
	display: flex;
	margin: auto;
	padding: 0 2rem;
	justify-content: space-between;
	height: 5rem;
	@media (max-width: 1185px) {
		display: none;
	}
`;

const FlexContainerUnder1184px = styled.div`
	display: none;

	@media (min-width: 768px) and (max-width: 1184px) {
		display: flex;
		margin: auto;
		padding: 0 2rem;
		justify-content: space-between;
		height: 5rem;
	}
`;

const FlexContainerUnder768px = styled.div`
	display: none;

	@media (min-width: 590px) and (max-width: 767px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		padding: 0 2rem;
		justify-content: space-between;
		height: 5rem;
	}
`;

const FlexContainerUnder590px = styled.div`
	display: none;

	@media (min-width: 399px) and (max-width: 589px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		padding: 0 2rem;
		justify-content: space-between;
		height: 5rem;
	}
`;

const Input = styled.input`
	height: 70px;
	margin-top: 0px;
	margin-bottom: 0px;
`;

const Button = styled.button`
	height: 70px;
	display: flex;
	align-items: center;
	margin-top: 0px;
	margin-bottom: 0px;
	color: var(--button-text-color);
	padding: 0 1rem;
	justify-content: space-between;
	background: var(--button-background);
	border-radius: 6px;
	&:hover {
		background: var(--button-hover-background);
	}
`;

const BurgerWrapper = styled.div`
	margin: auto 0;
	position: relative;
	height: 70px;
	left: 3px;
	float: left;
	// @media (min-width: 769px) {
	// 	display: none;
	// }
`;
