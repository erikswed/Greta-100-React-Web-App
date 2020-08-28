import React from 'react';
import uniqueId from 'lodash/uniqueId';
import NavBar from './NavBar';
import Resume from '../../resume.json';
import ShowBuildAndVersion from './ShowBuildAndVersion';

function Hero() {
	return (
		<section className="hero is-dark is-fullheight has-bg-image">
			<div className="hero-head">
				<NavBar />
			</div>
			<div className="hero-body">
				<div className="container">
					<p className="subtitle is-5 has-text-weight-light">I'm a</p>
					<h1 className="title">{Resume.basics.label}</h1>
					<h2 className="subtitle">
						{Resume.basics.location.region}, {Resume.basics.location.country}
					</h2>
					<div>
						<p className="subtitle is-5 has-text-weight-light">{Resume.basics.description}</p>
					</div>
					<div className="navbar-item  is-6   is-unselectable">{Resume.basics.fansite}</div>
					<div className="navbar-item  is-6   is-unselectable">{Resume.basics.fansiteDev}</div>
				</div>
			</div>

			<div className="hero-foot" style={{ paddingBottom: '20px' }}>
				<div className="columns is-mobile">
					<div className="column" />
					{Resume.basics.profiles.map(value => {
						const id = uniqueId();
						return (
							<div key={id} className="column has-text-centered">
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

export default Hero;
