import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import ShowBuildAndVersion from './ShowBuildAndVersion';

function Hero({ articles }) {
	if (typeof articles === 'undefined') return null;
	if (articles.length === 0) return null;
	return (
		<section className="hero is-dark is-fullheight has-bg-image">
			<div className="hero-head">
				<NavBar />
			</div>
			<div className="hero-body">
				<div className="container">
					<p className="subtitle is-5 has-text-weight-light">I'm a</p>
					<h1 className="title">{articles.basics.label}</h1>
					<h2 className="subtitle">
						{articles.basics.location.region}, {articles.basics.location.country}
					</h2>
					<div>
						<p className="subtitle is-5 has-text-weight-light">{articles.basics.description}</p>
					</div>
					<div className="navbar-item  is-6   is-unselectable">{articles.basics.fansite}</div>
					<div className="navbar-item  is-6   is-unselectable">{articles.basics.fansiteDev}</div>
				</div>
			</div>

			<div className="hero-foot" style={{ paddingBottom: '20px' }}>
				<div className="columns is-mobile">
					<div className="column" />
					{articles.basics.profiles.map(value => {
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

const mapStateToProps = state => {
	return { articles: state.rootReducer.remoteArticles };
};

const Aaa = connect(mapStateToProps, null)(Hero);
export default Aaa;
