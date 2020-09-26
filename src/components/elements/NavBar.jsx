import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = { showMenu: false };
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleMenuClick() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	render() {
		const { showMenu } = this.props;
		const { articles } = this.props;
		return (
			<nav className="navbar is-transparent">
				<div className="container">
					<div className="navbar-brand">
						<a href="/" className="navbar-item title is-unselectable my-name">
							{articles.basics.name}
						</a>
						<span className="navbar-burger burger" onClick={this.handleMenuClick}>
							<span />
							<span />
							<span />
						</span>
					</div>
					<div className={`navbar-menu nav-menu ${showMenu ? 'is-active' : null}`}>
						<div className="navbar-end" onClick={this.handleMenuClick}>
							<MenuItem text="About Greta" href="#aboutMe" />
							<MenuItem text="TimeLine" href="#timeline" />
							<MenuItem text="Articles" href="#articles" />
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return { articles: state.rootReducer.remoteArticles };
};

const Aaa = connect(mapStateToProps, null)(NavBar);
export default Aaa;
