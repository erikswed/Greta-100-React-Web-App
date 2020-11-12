/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { selectAlbumSlice } from '../../redux/albumData/albumData.selectors';
import { selectAlbumMetaSlice } from '../../redux/albumMetaData/albumMetaData.selectors';

const la = require('lodash');

class Wrapper extends React.Component {
	componentDidMount() {
		const { childRef } = this.props;
		childRef(this);
	}

	componentWillUnmount() {
		const { childRef } = this.props;
		childRef(undefined);
	}

	sliders() {
		const { albumMeta } = this.props;
		const { album } = this.props;
		if (album.length === 0) return null;
		if (albumMeta.length === 0) return null;
		return albumMeta.weeks.map(week => {
			let photo = la.find(album, { weekNumber: week.weekNumber });
			photo = encodeURI(`${process.env.PUBLIC_URL}/images/weeks/${week.weekNumber}/${photo.coverImage}`);
			const { onImageClick } = this.props;
			return (
				// Timeline items
				<section className="timeline-carousel" key={week.weekNumber}>
					<h1>week {week.weekNumber}</h1>
					<div className="timeline-carousel__item-wrapper" data-js="timeline-carousel">
						<div className="timeline-carousel__item">
							<div className="timeline-carousel__image">
								<img onClick={() => onImageClick(week.weekNumber)} alt="CoverImage" src={photo} />
								<h2>UNDER CONSTRUCTION IN PROGRES..</h2>
							</div>
							<div className="timeline-carousel__item-inner">
								<div className="pointer" />
								<span className="year">{week.year}</span>
								<span className="month">{week.albumDate}</span>
								<p>{week.summary}</p>
								<a href="#/" className="read-more">
									Read more, Dev should go to read more
								</a>
							</div>
						</div>
					</div>
				</section>
			);
		});
	}

	render() {
		const { afterChanged } = this.props;
		const { beforeChanged } = this.props;
		const settings = {
			dots: false,
			arrows: false,
			autoplay: false,
			infinite: true,
			lazyLoad: false,
			swipeToSlide: true,
			centerMode: false,
			focusOnSelect: false,
			className: 'center',
			slidesToShow: 3,
			afterChange: afterChanged,
			beforeChange: beforeChanged,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 3,
						infinite: false,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};
		return (
			<div>
				<Slider
					ref={slider => {
						this.slider = slider;
					}}
					{...settings}
				>
					{this.sliders()}
				</Slider>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { albumMeta: selectAlbumMetaSlice(state), album: selectAlbumSlice(state) };
};

const SliderWrapper = connect(mapStateToProps, null)(Wrapper);
export default SliderWrapper;
