import React, { useState } from 'react';
import styled from 'styled-components';

const NavLinkPage = () => {
	const [help, setHelp] = useState();

	function handleClick(val) {
		setHelp(val);
	}

	return (
		<NavLinks>
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '20%',
					transform: 'translate(-50%, -50%)',
					color: 'red',
					background: '#ffffff',
					zIndex: 2000,
				}}
			>
				{help}
			</div>
			<div>
				<div>
					<NavLink>
						<NavLinkRow>
							<NavLinkRowLogo>
								<NavLinkHeader>{/* GRETA 100 WEEKS <br /> RESOURCES */}</NavLinkHeader>
							</NavLinkRowLogo>
						</NavLinkRow>
						<NavLinkMenu style={{ marginLeft: '5%' }}>
							<NavLinkTag>About Us</NavLinkTag>
							<NavLinkList>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!')}>Who we are</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!')}>Contact</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!')}>Privacy Policy</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!')}>Terms of Service</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!')}>More items..</a>
								</NavLinkItem>
							</NavLinkList>
						</NavLinkMenu>
						<NavLinkMenu>
							<NavLinkTag>Greta 100 weeks</NavLinkTag>
							<NavLinkList>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!')}>Visit Us</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!')}>Accessibility</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!')}>Shop</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!')}>More items..</a>
								</NavLinkItem>
							</NavLinkList>
						</NavLinkMenu>
						<NavLinkMenu>
							<NavLinkTag>Support Greta 100 weeks</NavLinkTag>
							<NavLinkList>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!')}>Donate</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!')}>Share Her Journey</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!')}>Our Impact</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!!')}>More items..</a>
								</NavLinkItem>
							</NavLinkList>
						</NavLinkMenu>
						<NavLinkMenu>
							<NavLinkTag>Learning + Outreach</NavLinkTag>
							<NavLinkList>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!!!')}>Learning</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!!!!')}>Link Library</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!!!!!')}>Facebook resources</a>
								</NavLinkItem>
								<NavLinkItem>
									<a onClick={() => handleClick('HELP Developer needed!!!!!!!!!!!!!!!!!!F')}>More items..</a>
								</NavLinkItem>
							</NavLinkList>
						</NavLinkMenu>
					</NavLink>
				</div>
			</div>
		</NavLinks>
	);
};

export default NavLinkPage;

const NavLinks = styled.ul`
	height: 100%;
	background: #2d3436;
	position: fixed;
	right: 0;
	width: 100%;
	z-index: 100;
	@media (max-width: 1098px) {
		position: absolute !important;
		top: -9999px !important;
		left: -9999px !important;
`;

const NavLink = styled.div`
	width: 100vw;
	height: 100vh;
	top: 0;
	position: fixed;
	padding: 0 27px;
`;

const NavLinkRow = styled.div`
	width: 85%;
	margin: 2% 10% 0 5%;
	height: 100px;
`;

const NavLinkRowLogo = styled.div`
	height: 60px;
	float: left;
`;

const NavLinkHeader = styled.div`
	font-size: 24px;
	font-weight: 700;
	color: #fff;
`;

const NavLinkMenu = styled.div`
	width: calc(90% / 4);
	float: left;
`;

const NavLinkTag = styled.div`
	width: 100%;
	font-size: 18px;
	font-weight: 700;
	margin-right: 60px;
	color: #fff;
	margin: 50px 0;
`;

const NavLinkList = styled.div`
	padding-right: 30px;
`;

const NavLinkItem = styled.div`
	font-size: 18px;
	border-bottom: 1px solid #999;
	color: #999;
	padding-bottom: 25px;
	margin-bottom: 25px;
	font-weight: 300;
	text-decoration: underline;
`;
