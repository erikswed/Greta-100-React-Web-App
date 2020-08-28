import styled from 'styled-components';
import { space, fontSize, fontWeight, fontFamily, color } from 'styled-system';
import tag from 'clean-tag';

const Text = styled(tag)`
	${space}
	${fontSize}
    ${fontWeight}
    ${fontFamily}
    ${color}
display: ${({ block }) =>
		block ? 'block' : 'inline-block'};
`;

export default Text;
