import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from './UseOnClickOutside';
import NavLinkPage from './NavLinkPage';
import SideMenu from './SideMenu';

const CollapseMenu = props => {
	const { show, close } = props;
	const { open } = useSpring({ open: show ? 0 : 1 });

	const reference = useRef();
	useOnClickOutside(reference, close, 'burgerMenu');

	const escFunction = useCallback(
		event => {
			// only accept 27 if it's visible
			if (event.keyCode === 27 && show === true) {
				close();
			}
		},
		[close, show],
	);

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);
		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	if (show === true) {
		return (
			<CollapseWrapper
				ref={reference}
				style={{
					transform: open
						.interpolate({
							range: [0, 0.2, 0.3, 1],
							output: [0, -20, 0, -200],
						})
						.interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
				}}
			>
				<NavLinkPage />
				<SideMenu close={close} />
			</CollapseWrapper>
		);
	}
	return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
	position: fixed;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	z-index: 100;
`;
