/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useCallback } from 'react';
import '../../styles/sideDrawer.css';
import useOnClickOutside from './UseOnClickOutside';

const SlideDrawer = ({ show, close }) => {
	let drawerClasses = 'side-drawer';
	if (show) {
		drawerClasses = 'side-drawer open';
	}

	const escFunction = useCallback(
		event => {
			if (event.keyCode === 27) {
				close();
			}
		},
		[close],
	);

	const reference = useRef();
	useOnClickOutside(reference, close, 'navbar-toggler-icon');

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	function handleClick() {
		alert('HELP Developer needed!! ');
	}

	return (
		<>
			<div className={drawerClasses} ref={reference}>
				<div>
					<div id="desktop-hamburger">
						<div className="desktop-hamburger-row">
							<div className="desktop-hamburger-logo">
								<div className="desktop-hamburger-header">
									GRETA 100 WEEKS
									<br />
									RESOURCES
								</div>
							</div>
						</div>
						<div className="desktop-hamburger-menu" style={{ marginLeft: '5%' }}>
							<div className="desktop-hamburger-tag">About Us</div>
							<div className="desktop-hamburger-list">
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Who we are
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Contact
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Privacy Policy
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Terms of Service
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										More items..
									</a>
								</div>
							</div>
						</div>
						<div className="desktop-hamburger-menu">
							<div className="desktop-hamburger-tag">Greta 100 weeks</div>
							<div className="desktop-hamburger-list">
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Visit Us
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Accessibility
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Shop
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										More items..
									</a>
								</div>
							</div>
						</div>
						<div className="desktop-hamburger-menu">
							<div className="desktop-hamburger-tag">Support Greta 100 weeks</div>
							<div className="desktop-hamburger-list">
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Donate
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Share Her Journey
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Our Impact
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										More items..
									</a>
								</div>
							</div>
						</div>
						<div className="desktop-hamburger-menu">
							<div className="desktop-hamburger-tag">Learning + Outreach</div>
							<div className="desktop-hamburger-list">
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Learning
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Link Library
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										Facebook resources
									</a>
								</div>
								<div className="desktop-hamburger-item">
									<a href="#" onClick={handleClick}>
										More items..
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SlideDrawer;
