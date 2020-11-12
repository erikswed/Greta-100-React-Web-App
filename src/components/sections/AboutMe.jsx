import React from 'react';
import { connect } from 'react-redux';
import { selectAlbumMetaSlice } from '../../redux/albumMetaData/albumMetaData.selectors';

function AboutMe({ albumMeta }) {
	if (typeof albumMeta === 'undefined') return null;
	if (albumMeta.length === 0) return null;

	return (
		<section className="section has-background-link" id="aboutMe">
			<div className="container has-text-centered">
				<figure className="image container is-180x180">
					<img
						width="180px"
						height="180px"
						src={albumMeta.basics.picture}
						alt={albumMeta.basics.name}
						className="is-rounded"
						onError={e => {
							e.target.onerror = null;
							e.target.src = albumMeta.basics.x_pictureFallback;
						}}
					/>
				</figure>
				<p className="subtitle is-4 has-text-white has-text-weight-bold">{albumMeta.basics.x_title}</p>
				<p className="subtitle is-5 has-text-white has-text-weight-light summary-text">{albumMeta.basics.summary}</p>
			</div>
		</section>
	);
}
const mapStateToProps = state => {
	return { albumMeta: selectAlbumMetaSlice(state) };
};

const Aaa = connect(mapStateToProps, null)(AboutMe);
export default Aaa;
