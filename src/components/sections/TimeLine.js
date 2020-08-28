import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import SliderWrapper from './SliderWrapper';

class Timeline extends React.Component {
	constructor(props) {
		super(props);
		this.changeHandler = this.changeHandler.bind(this);
		this.changeSlider = this.changeSlider.bind(this);
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
		this.setState(
			{
				updateCount: updateCount + 1,
			},
			// () => console.log(`test state after update: ${updateCount}`),
		);
	}

	changeSlider() {
		this.setState({
			slideIndex: this.sliderWrapper.slider.innerSlider.state.currentSlide,
		});
		// const { onChangeAlbum } = this.props;
		// onChangeAlbum(this.sliderWrapper.slider.innerSlider.state.currentSlide);
	}

	changeHandler(e) {
		this.sliderWrapper.slider.slickGoTo(e.target.value);
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
						ref={sliderWrapper => {
							this.sliderWrapper = sliderWrapper;
						}}
						beforeChanged={this.changeUpdateCount.bind(this)}
						afterChanged={this.changeSlider.bind(this)}
						slideIndex={slideIndex}
						updateCounter={updateCount}
					/>
				</div>
			</section>
		);
	}
}

export default Timeline;
