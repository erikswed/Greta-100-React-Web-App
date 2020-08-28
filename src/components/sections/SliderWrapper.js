/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Resume from '../../resume.json';
import albums from '../../albumData.json';

const la = require('lodash');

class SliderWrapper extends React.Component {
	shouldComponentUpdate(nextProps) {
		// certain condition here, perhaps comparison between this.props and nextProps
		// and if you want to update slider on setState in parent of this, return true, otherwise return false
		const { updateCount } = nextProps;
		const { updateCounter } = this.props;

		if (updateCounter !== updateCount) {
			return false;
		}
		// console.log("shouldComponentUpdate");
		return true;
	}

	sliders() {
		return Resume.weeks.map(week => {
			let photo = la.find(albums, { weekNumber: week.weekNumber });
			photo = encodeURIComponent(`${process.env.PUBLIC_URL}/images/weeks/${week.weekNumber}/${photo.coverImage}`);
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
			slidesToShow: 4,
			afterChange: afterChanged,
			beforeChange: beforeChanged,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
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

export default SliderWrapper;
