/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WithDashboardNavigate from '../../session/WithDashboardNavigate';
import { AuthUserContext } from '../../session';
import * as ROLES from '../../constants/roles';

function SideMenuBase(props) {
	const { close, dashboardNavigater, authUser } = props;
	const navigate = useNavigate();

	const onArticlesPageClick = () => {
		const node = document.getElementById('scroll-to-articles');
		node.scrollIntoView({ behavior: 'smooth' });
		close();
	};

	const onTimelinePageClick = () => {
		const node = document.getElementById('scroll-to-timeline');
		node.scrollIntoView({ behavior: 'smooth' });
		close();
	};

	const onAboutMePageClick = () => {
		const node = document.getElementById('scroll-to-aboutMe');
		node.scrollIntoView({ behavior: 'smooth' });
		close();
	};

	const onSearchPageClick = () => {
		const node = document.getElementById('scroll-to-timeline');
		node.scrollIntoView({ behavior: 'smooth' });
		close();
	};

	const onProfilePageClick = () => {
		if (close) close();
		dashboardNavigater(navigate);
	};

	return (
		<div>
			<MenuLinksSpace />
			<MenuLinks>
				<li>
					<a onClick={onArticlesPageClick} role="presentation">
						<span className="icon is-medium" style={{ marginRight: '0.4rem' }}>
							<i className="fas fa-newspaper" />
						</span>
						Articles
					</a>
				</li>
				<li>
					<a onClick={onTimelinePageClick} role="presentation">
						<span className="icon is-medium" style={{ marginRight: '0.4rem' }}>
							<i className="fas fa-stream" />
						</span>
						Timeline
					</a>
				</li>
				<li>
					<a onClick={onAboutMePageClick} role="presentation">
						<span className="icon is-medium" style={{ marginRight: '0.4rem' }}>
							<i className="fas fa-info-circle" />
						</span>
						About
					</a>
				</li>
				<li>
					<a onClick={onSearchPageClick} role="presentation">
						<span className="icon is-medium" style={{ marginRight: '0.4rem' }}>
							<i className="fas fa-search" />
						</span>
						Search
					</a>
				</li>
				{authUser ? (
					<li style={{ listStyleType: 'none' }}>
						<a onClick={onProfilePageClick} style={{ display: 'flex' }} role="presentation">
							<span className="icon is-medium" style={{ marginRight: '0.4rem' }}>
								<i className="fas fa-user" />
							</span>
							<div>
								{Array.isArray(authUser.roles) && authUser.roles.includes(ROLES.USER) ? (
									<div>Dashboard</div>
								) : (
									<div>Sign in</div>
								)}
							</div>
						</a>
					</li>
				) : null}
			</MenuLinks>
		</div>
	);
}

const SideMenuBaseEnhanced = WithDashboardNavigate(SideMenuBase);
const SideMenu = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<SideMenuBaseEnhanced authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

export default SideMenu;

const MenuLinksSpace = styled.div`
	height: 60px;
	background: #2d3436;
	width: 200px;
`;

const MenuLinks = styled.ul`
	list-style-type: none;
	padding: 2rem 1rem 2rem 2rem;
	z-index: 1000;
	background: #2d3436;
	display: inline-block;
	width: 200px;

	& li {
		transition: all 300ms linear 0s;
	}

	& a {
		font-size: 1.4rem;
		line-height: 2;
		color: #dfe6e9;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			color: #fdcb6e;
			border-bottom: 1px solid #fdcb6e;
		}
	}
	@media (max-width: 767px) {
		display: block;
	}
`;
