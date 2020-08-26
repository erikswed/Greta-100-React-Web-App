//import Timeline from "../elements/Timeline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Resume from "../../resume.json";
import albums from "../../albumData.json";
//import json from "./images/resume.json"
class Timeline extends React.Component {

    constructor(props) {
        super(props)
        this.changeHandler = this.changeHandler.bind(this)
        this.changeSlider = this.changeSlider.bind(this)
        this.state = {
            slideIndex: 1,
            updateCount: 0,
        }
    }

    changeHandler(e) {
        this.sliderWrapper.slider.slickGoTo(e.target.value)
    }

    changeSlider() {
        this.setState({
            slideIndex: this.sliderWrapper.slider.innerSlider.state.currentSlide
        })
        //const { onChangeAlbum } = this.props;
        // onChangeAlbum(this.sliderWrapper.slider.innerSlider.state.currentSlide);
    }

    changeUpdateCount(e) {
        this.setState({
            updateCount: this.state.updateCount + 1
        }, () => console.log(`test state after update: ${this.state.updateCount}`))
    }

    onImageClick = val => {
        const { onChangeAlbum } = this.props;
        onChangeAlbum(val);
    };

    render() {
        return (
            <section className="hero is-dark  has-bg-image">
                <div className="c" id="timeline">
                    <p>Your at Album: {this.state.slideIndex} </p>
                    <input onChange={this.changeHandler} value={this.state.slideIndex} type='range' min={0} max={7} />
                    <SliderWrapper onImageClick={this.onImageClick}
                        ref={sliderWrapper => this.sliderWrapper = sliderWrapper}
                        beforeChange={this.changeUpdateCount.bind(this)}
                        afterChange={this.changeSlider.bind(this)}
                        slideIndex={this.state.slideIndex}
                        updateCount={this.state.updateCount}
                    />
                </div>
            </section>
        );
    }
}

class SliderWrapper extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        // certain condition here, perhaps comparison between this.props and nextProps
        // and if you want to update slider on setState in parent of this, return true, otherwise return false
        if (this.props.updateCount !== nextProps.updateCount) {
            return false
        }
        return true
    }

    sliders() {
        return Resume.weeks.map(week => {
            // var aaa = "" ;
            // fetch('./albumData.json').then(response => {
            //     console.log(response);
            //     return response.json();
            //   }).then(data => {
            //     // Work with JSON data here
            //     console.log(data);
            //     aaa = data;
            //   }).catch(err => {
            //     // Do something for an error here
            //     console.log("Error Reading data " + err);
            //   });
            // Get the covewr image 
            const _ = require('lodash'); 
            let photo = _.find(albums, {weekNumber: week.weekNumber})
            photo = process.env.PUBLIC_URL + '/images/weeks/' +  week.weekNumber  + "/" + photo.coverImage;
            //photo = './images/weeks/' +  week.weekNumber  + "/" + photo.coverImage;
            //let phot2 = "./images/weeks/resume.json";
            // console.log("test" + typeof phot2)
            //const json = require('json-loader!./images/resume.json');
            //console.log('entryUrl', window.samleA1ppConfig.entryUrl);

            return (
                // Timeline items
                <section className="timeline-carousel" key={week.weekNumber}>
                 {/* <h1 className="title">{json.basics.label}</h1> */}
                   <h1>week {week.weekNumber}</h1>
                    <div className="timeline-carousel__item-wrapper" data-js="timeline-carousel">
                        <div className="timeline-carousel__item">
                            <div className="timeline-carousel__image">
                                <img onClick={() => this.props.onImageClick(week.weekNumber)} alt="image" src={photo} />
                                <h2>UNDER CONSTRUCTION IN PROGRES..</h2>
                            </div>
                            <div className="timeline-carousel__item-inner">
                                <div className="pointer" />
                                <span className="year">{week.year}</span>
                                <span className="month">{week.albumDate}</span>
                                <p>{week.summary}</p>
                                <a href="#" className="read-more">Read more</a>
                            </div>
                        </div>
                    </div>
                </section>
            )
        });
    }

    render() {
        const settings = {
            dots: false,
            arrows: false,
            autoplay: false,
            infinite: true,
            lazyLoad: false,
            swipeToSlide: true,
            centerMode: false,
            focusOnSelect: false,
            className: "center",
            slidesToShow: 4,
            afterChange: this.props.afterChange,
            beforeChange: this.props.beforeChange,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        return (
            <div >
                <Slider ref={slider => this.slider = slider} {...settings}>
                    {this.sliders()}
                </Slider>
            </div>
        );


    }
}
export default Timeline