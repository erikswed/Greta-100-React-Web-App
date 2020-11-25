import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import SliderWrapper from './SliderWrapper';
import '../../styles/time-line-carousel.css';

class Timeline extends React.PureComponent {
	constructor() {
		super();
		this.changeHandler = this.changeHandler.bind(this);
		this.changeSlider = this.changeSlider.bind(this);
		// this.changeUpdateCount = this.changeUpdateCount.bind(this);
		this.state = {
			slideIndex: 1,
			// updateCount: 0,
		};
	}

	onImageClick = val => {
		const { onChangeAlbum } = this.props;
		onChangeAlbum(val);
	};

	// onChangeUpdateCount() {
	// 	this.changeUpdateCount.bind(this);
	// }

	// changeUpdateCount() {
	// 	const { updateCount } = this.state;
	// 	this.state.updateCount = updateCount + 1;
	// }

	changeSlider() {
		this.setState({
			slideIndex: this.wrapper.slider.innerSlider.state.currentSlide,
		});
	}

	changeHandler(e) {
		this.wrapper.slider.slickGoTo(e.target.value);
	}

	render() {
		const { slideIndex } = this.state;

		return (
			<section id="scroll-to-timeline" className="hero is-dark  has-bg-image">
				<div className="c" id="timeline">
					<p>Your at Album: {slideIndex} </p>
					<input onChange={this.changeHandler} value={slideIndex} type="range" min={0} max={50} />
					<SliderWrapper
						onImageClick={this.onImageClick}
						childRef={ref => {
							this.wrapper = ref;
						}}
						// beforeChanged={this.changeUpdateCount}
						afterChanged={this.changeSlider}
						slideIndex={slideIndex}
					/>
				</div>
			</section>
		);
	}
}

export default Timeline;
