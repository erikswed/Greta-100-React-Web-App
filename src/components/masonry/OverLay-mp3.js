import React, { Component } from 'react';
import '../../styles/overlay-mp3-renderer.scss';
class OverlayMp3 extends Component {
	constructor(props) {
		super();
		this.state = {
			hoverIndex: null,
		};
	}

	componentWillUnmount() {
		clearTimeout();
	}

	handleMouseEnter = e => {
		if (e.target.id !== null) {
			const that = this;
			const { id } = e.target;
			this.timeout = setTimeout(function Foo() {
				// set the pointerEvents to auto so user can click buttons
				if (document.getElementById( "mp3-box" ) != null)
					document.getElementById( "mp3-box" ).style.pointerEvents = 'auto';
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		if (document.getElementById( "mp3-box" ) != null)
			document.getElementById( "mp3-box" ).style.pointerEvents = 'none';
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;
		return (
			<div className={`box-container-mp3 ${hoverIndex === "mp3-box" ? 'hovered-mp3' : ''}`}
			 id={"mp3-box"} key={fileData} 	
			>
				<div className="clickBox-mp3"
					onMouseEnter={this.handleMouseEnter}
					id={"mp3-box"}
				></div>
				<div className="box-content-mp3" onMouseLeave={this.handleMouseLeave}>
					<div className="text-group-mp3">Mp3 File</div>

					<div className="btn-group-mp3">
						<button className="btn btn-secondary" type="button">
							Open File
						</button>
						<button className="btn btn-secondary" type="button">
							Edit Description
						</button>
						<button className="btn btn-secondary" type="button">
							Download
						</button>
						<button className="btn btn-secondary" type="button">
							Push me for fun
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default OverlayMp3;
