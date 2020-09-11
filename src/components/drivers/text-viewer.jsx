/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import '../../styles/text-viewer.scss';
import uniqueId from 'lodash/uniqueId';
import Loading from '../file-viewer/loading';

class TextViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	onCanView() {
		this.setState({ loading: false });
	}

	showFile = async e => {
		e.preventDefault();
		const reader = new FileReader();
		reader.onload = async e => {
			const text = e.target.result;
			console.log(text);
			alert(text);
		};
		reader.readAsText(e.target.files[0]);
	};

	renderLoading() {
		if (this.state.loading) {
			return <Loading />;
		}
		return null;
	}

	render = () => {
		return <TextFileReader txt={this.props.filePath} />;
	};
}

export default TextViewer;

/*
	Read a text file and out put the content.
	
	Example Usage:

	var myTxt = require("./myTxt.txt");
	...
	<TextFileReader
		txt={myTxt}
	/>
 */
export class TextFileReader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
		};
	}

	componentDidMount() {
		this.readTextFile(this.props.txt);
	}

	readTextFile = file => {
		const rawFile = new XMLHttpRequest();
		rawFile.open('GET', file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					const allText = rawFile.responseText;
					this.setState({
						text: allText,
					});
				}
			}
		};
		rawFile.send(null);
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: 'white',
				}}
			>
				{this.state.text.split('\n').map(item => {
					return (
						<span key={uniqueId()}>
							{item}
							<br />
						</span>
					);
				})}
			</div>
		);
	}
}
