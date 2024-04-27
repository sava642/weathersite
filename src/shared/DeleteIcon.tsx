import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
	onClick: () => void;
}

const DeleteIcon: React.FC<Props> = ({ onClick }) => {
	return <AiOutlineCloseCircle color="red" size={24} onClick={onClick} />;
};

export default DeleteIcon;

