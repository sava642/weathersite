import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/reducers';
import { addSelectedCity } from '../entities/citysearch';
import { useNavigate } from 'react-router-dom';

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

const SquareContainer = styled.div`
	border-radius: 10px;
	background-color: #00ccff;
	z-index: 99999;
	overflow: auto;
	width: 100%;
	height: 100%;
`;
const SquarWrapper = styled.div`
	position: fixed;
	left: 20px;
	bottom: 140px;
	z-index: 99999;
	width: 40%;
	height: 20%;
`;

const ListItem = styled.div`
	padding: 10px;
	border-bottom: 1px solid #ccc;
	cursor: pointer;
`;

const ResentResults = () => {
	const dispatch = useDispatch();
	const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);

	const handleCityClick = (city: City) => {
		dispatch(addSelectedCity({ city }));
	};

	return (
		<SquarWrapper>
			<p>Resent results</p>
			<SquareContainer>
				{selectedCities.map((item: City, index) => (
					<ListItem key={index} onClick={() => handleCityClick(item)} >
						{item.name}
					</ListItem>
				))}
			</SquareContainer>
		</SquarWrapper>
	);
};

export default ResentResults;


