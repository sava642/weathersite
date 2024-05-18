import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/reducers';
import { addSelectedCity } from '../entities/citysearch';
import { useNavigate } from 'react-router-dom';
interface LocalNames {
	[language: string]: string;
}
interface City {
	name: string;
	lat: string;
	lon: string;
	country: string;
	state: string;
	local_names: LocalNames;
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
	bottom: 60px;
	z-index: 99999;
	width: 40%;
	height: 20%;
`;

const ListItem = styled.div`
	padding: 8px;
	border-bottom: 1px solid #ccc;
	cursor: pointer;
`;

const ResentResults = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
	const currentCity = useSelector((state: RootState) => state.cities.currentCity);

	// useEffect(() => {
	// 	// Выполняем навигацию только при монтировании компонента
	// 	if (currentCity) {
	// 		const path = `/city/${currentCity.name}/${currentCity.lat}/${currentCity.lon}`;
	// 		navigate(path, { replace: false });
	// 	}
	// }, []);

	const handleCityClick = (city: City) => {
		dispatch(addSelectedCity({ city }));
		// const path = `/city/${city.name}/${city.lat}/${city.lon}`;
		// navigate(path, { replace: false });
	};

	return (
		<SquarWrapper>
			<p>Resent results</p>
			<SquareContainer>
				{selectedCities.map((item: City, index: React.Key | null | undefined) => (
					<ListItem key={index} onClick={() => handleCityClick(item)} >
						{item.name}
					</ListItem>
				))}
			</SquareContainer>
		</SquarWrapper>
	);
};

export default ResentResults;


