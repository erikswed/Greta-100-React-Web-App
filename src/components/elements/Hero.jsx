import React, { useState, useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import ShowBuildAndVersion from './ShowBuildAndVersion';
import SlideDrawer from '../side-drawer/SideDrawer';
import { selectAlbumMetaSlice } from '../../redux/albumMetaData/albumMetaData.selectors';

function Hero({ albumMeta }) {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [yOffset, setYOffset] = useState(window.pageYOffset);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function handleScroll() {
		const currentYOffset = window.pageYOffset;
		const isVisible = yOffset > currentYOffset;

		setYOffset(currentYOffset);
		setVisible(isVisible);
	}

	const drawerToggleClickHandler = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	const backdropClickHandler = () => {
		setDrawerIsOpen(false);
	};

	if (typeof albumMeta === 'undefined') return null;
	if (albumMeta.length === 0) return null;
	return (
		<section className="hero is-dark is-fullheight has-bg-image">
			<div className="hero-head">
				<NavBar toggle={drawerToggleClickHandler} visible={visible} />
				<SlideDrawer show={drawerIsOpen} close={backdropClickHandler} />
			</div>
			<div className="hero-body">
				<div className="container">
					<p className="subtitle is-5 has-text-weight-light">I'm a</p>
					<h1 className="title">{albumMeta.basics.label}</h1>
					<h2 className="subtitle">
						{albumMeta.basics.location.region}, {albumMeta.basics.location.country}
					</h2>
					<div>
						<p className="subtitle is-5 has-text-weight-light">{albumMeta.basics.description}</p>
					</div>
					<div className="navbar-item  is-6   is-unselectable">{albumMeta.basics.fansite}</div>
					<div className="navbar-item  is-6   is-unselectable">{albumMeta.basics.fansiteDev}</div>
				</div>
			</div>

			<div className="hero-foot" style={{ paddingBottom: '20px' }}>
				<div className="columns is-mobile">
					<div className="column" />
					{albumMeta.basics.profiles.map(value => {
						return (
							<div key={uniqueId()} className="column has-text-centered">
								<a href={value.url} target="blank" className="is-hovered" title={value.network}>
									<span className="icon is-medium is-">
										<i className={value.x_icon} />
									</span>
								</a>
							</div>
						);
					})}
					<div className="column" />
				</div>
			</div>
			<div
				style={{
					position: 'static',
					color: 'gray',
					fontSize: '.875rem',
				}}
			>
				<ShowBuildAndVersion />
			</div>
		</section>
	);
}

const mapStateToProps = state => {
	return { albumMeta: selectAlbumMetaSlice(state) };
};

const Aaa = connect(mapStateToProps, null)(Hero);
export default Aaa;
