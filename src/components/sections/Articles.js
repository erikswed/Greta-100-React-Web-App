/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import Article from '../elements/Article';

class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = { articles: [] };
	}

	getArticles() {
		if (this.props.articles.length === 0) return null;
		const articles = [];
		this.props.articles.article.map(element => {
			const id = uniqueId();
			articles.push(
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
			articles.push(<div className="column" />);
		}
		this.state.articles = articles;
		return null;
	}

	render() {
		this.getArticles();
		const { articles } = this.state;
		return (
			<section className="section" id="articles">
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
	return { articles: state.rootReducer.remoteArticles };
};

const Aaa = connect(mapStateToProps, null)(Articles);
export default Aaa;
