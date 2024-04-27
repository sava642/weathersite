import React from 'react';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import styled from 'styled-components';

interface Props {
	onClick: () => void;
}

const StyledAddIcon = styled(MdFormatListBulletedAdd)`
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 9999;
	color: yellow;
	font-size: 48px;
	cursor: pointer;
`;

const AddIcon: React.FC<Props> = ({ onClick }) => {
	return <StyledAddIcon onClick={onClick} />;
};

export default AddIcon;
