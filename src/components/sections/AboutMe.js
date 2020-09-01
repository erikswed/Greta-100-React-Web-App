import React from 'react';
import { connect } from 'react-redux';

function AboutMe({ articles }) {
	if (typeof articles === 'undefined') return null;
	if (articles.length === 0) return null;

	return (
		<section className="section has-background-link" id="aboutMe">
			<div className="container has-text-centered">
				<figure className="image container is-180x180">
					<img
						width="180px"
						height="180px"
						src={articles.basics.picture}
						alt={articles.basics.name}
						className="is-rounded"
						onError={e => {
							e.target.onerror = null;
							e.target.src = articles.basics.x_pictureFallback;
						}}
					/>
				</figure>
				<p className="subtitle is-4 has-text-white has-text-weight-bold">{articles.basics.x_title}</p>
				<p className="subtitle is-5 has-text-white has-text-weight-light summary-text">{articles.basics.summary}</p>
			</div>
		</section>
	);
}
const mapStateToProps = state => {
	return { articles: state.rootReducer.remoteArticles };
};

const Aaa = connect(mapStateToProps, null)(AboutMe);
export default Aaa;
