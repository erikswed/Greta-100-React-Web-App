import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import Article from './Article';
import { selectAlbumMetaSlice } from '../../redux/albumMetaData/albumMetaData.selectors';

// TODO Template to be used
class Articles extends Component {
	constructor() {
		super();
		this.state = { articles: [] };
	}

	getArticles() {
		const { albumMeta } = this.props;
		if (albumMeta.length === 0) return null;
		const article = [];
		albumMeta.article.map(element => {
			const id = uniqueId();
			article.push(
				<div className="column" key={id}>
					<Article
						key={id}
						title={element.title}
						url={element.url1}
						image={element.cover_image}
						extract={element.description}
					/>
				</div>,
			);
			return false;
		});
		// Hard coded for 4 columns
		for (let i = 0; i < 0; i += 1) {
			article.push(<div className="column" />);
		}
		this.state.articles = article;
		return null;
	}

	render() {
		this.getArticles();
		const { articles } = this.state;
		return (
			<section className="section" id="scroll-to-articles">
				<div className="container">
					<h1 className="title">Articles</h1>
					<h2 className="subtitle is-4">My latest articles</h2>
					<div className="columns">{articles}</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return { albumMeta: selectAlbumMetaSlice(state) };
};

const Aaa = connect(mapStateToProps, null)(Articles);
export default Aaa;
