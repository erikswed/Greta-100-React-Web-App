import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import SliderWrapper from './SliderWrapper';
import '../../styles/time-line-carousel.css';

class Timeline extends React.Component {
	constructor() {
		super();
		this.changeHandler = this.changeHandler.bind(this);
		this.changeSlider = this.changeSlider.bind(this);
		this.changeUpdateCount = this.changeUpdateCount.bind(this);
		this.state = {
			slideIndex: 1,
			updateCount: 0,
		};
	}

	onImageClick = val => {
		const { onChangeAlbum } = this.props;
		onChangeAlbum(val);
	};

	onChangeUpdateCount() {
		this.changeUpdateCount.bind(this);
	}

	changeUpdateCount() {
		const { updateCount } = this.state;
		this.setState({
			updateCount: updateCount + 1,
		});
	}

	changeSlider() {
		this.setState({
			slideIndex: this.wrapper.slider.innerSlider.state.currentSlide,
		});
		// when swiping the carrousel this changes the album in the TimeLineWiew to the selected carrousel album
		// const { onChangeAlbum } = this.props;
		// onChangeAlbum(this.sliderWrapper.slider.innerSlider.state.currentSlide);
	}

	changeHandler(e) {
		this.wrapper.slider.slickGoTo(e.target.value);
	}

	render() {
		const { slideIndex } = this.state;
		const { updateCount } = this.state;

		return (
			<section className="hero is-dark  has-bg-image">
				<div className="c" id="timeline">
					<p>Your at Album: {slideIndex} </p>
					<input onChange={this.changeHandler} value={slideIndex} type="range" min={0} max={50} />
					<SliderWrapper
						onImageClick={this.onImageClick}
						childRef={ref => {
							this.wrapper = ref;
						}}
						beforeChanged={this.changeUpdateCount}
						afterChanged={this.changeSlider}
						slideIndex={slideIndex}
						updateCounter={updateCount}
					/>
				</div>
			</section>
		);
	}
}

export default Timeline;
