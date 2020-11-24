import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/The first 100 weeks in pictures and more7.png';

const Brand = () => {
	return <Image src={logo} alt="Greta's Weeks" />;
};

export default Brand;

const Image = styled.img`
	height: 70px;
	height: 100%;
	margin: auto 0;
	@media (max-width: 576px) {
		display: none;
	}
`;
