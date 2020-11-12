import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import '../../styles/navbar.scss';
import { Offline } from 'react-detect-offline';
import { AuthUserContext } from '../../session';
import LoadingButton from '../profile/LoadingButton';
import SignedInButton from '../profile/SignedInButton';

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = { showMenu: false, height: 0, width: 0 };
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.window = React.createRef();
		window.addEventListener('resize', this.update);
	}

	componentDidMount() {
		this.update();
	}

	update = () => {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth,
		});
	};

	handleMenuClick() {
		const { showMenu } = this.state;
		this.setState({ showMenu: !showMenu });
	}

	render() {
		const { toggle } = this.props;
		const { visible } = this.props;
		return (
			<div>
				<>
					<Navbar
						expand="false"
						bg="dark"
						variant="dark"
						fixed="top"
						collapseOnSelect
						className={`navbar ${!visible ? 'navbar--hidden' : ''} d-flex justify-content-between align-items-center`}
					>
						<Offline>
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '10%',
									transform: 'translate(-50%, -50%)',
									color: 'red',
								}}
							>
								It appears you don't have an active Internet connection!
							</div>
						</Offline>
						<Form inline className="flex-nowrap">
							<Navbar.Brand href="#home" className="img-container">
								<img alt="" className="logo" />
							</Navbar.Brand>
							<FormControl type="text" placeholder="Search Title, Events or Dates" className="mr-sm-2" />
							<Button variant="primary" size="huge" href="#articles">
								Articles
							</Button>
							<Button variant="primary" size="huge" href="#timeline">
								Timeline
							</Button>
							<Button variant="primary" size="huge" href="#aboutMe">
								About
							</Button>
							&nbsp;&nbsp;&nbsp;
							<AuthUserContext.Consumer>
								{authUser => (authUser ? <SignedInButton /> : <LoadingButton />)}
							</AuthUserContext.Consumer>
							<Navbar.Toggle className="toggle-button" aria-controls="responsive-navbar-nav" onClick={toggle} />
						</Form>
					</Navbar>
				</>{' '}
			</div>
		);
	}
}

export default NavBar;
