import React from 'react';

function Article({ url, title, image, extract }) {
	return (
		<div className="card">
			<div className="card-header">
				<a href={url} target="blank">
					<p className="card-header-title">{title}</p>
				</a>
				<a href={url} target="blank" className="card-header-icon" aria-label="Dev Community">
					<span className="icon">
						<i className="fab fa-2x fa-dev" />
					</span>
				</a>
			</div>
			<div className="card-image">
				<figure className="image">
					<img width="1000" height="420" src={image} alt="" />
				</figure>
			</div>
			<div className="card-content">
				<h1 className="heading">DEV.TO</h1>
				<div className="content">
					<p>{extract}</p>
				</div>
				<a href={url} target="blank">
					Read the full article
				</a>
			</div>
		</div>
	);
}

export default Article;
