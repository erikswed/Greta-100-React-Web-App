import React, { Component } from 'react';
import '../../styles/overlay-xlsx-renderer.scss';
class OverlayXlsx extends Component {
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
				if (document.getElementById( "xlsx-box" ) != null)
					document.getElementById( "xlsx-box" ).style.pointerEvents = 'auto';
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		if (document.getElementById( "xlsx-box" ) != null)
			document.getElementById( "xlsx-box" ).style.pointerEvents = 'none';
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;
		return (
			<div className={`box-container-xlsx ${hoverIndex === "xlsx-box" ? 'hovered-xlsx' : ''}`}
			 id={"xlsx-box"} key={fileData} 	
			 onMouseLeave={this.handleMouseLeave}
			>
				<div className="clickBox-xlsx"
					onMouseEnter={this.handleMouseEnter}
					id={"xlsx-box"}
				></div>
				<div className="box-content-xlsx" onMouseLeave={this.handleMouseLeave}>
					<div className="text-group-xlsx">Spreadsheet  File</div>

					<div className="btn-group-xlsx">
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

export default OverlayXlsx;
