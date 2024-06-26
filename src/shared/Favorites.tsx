import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/reducers';
import { removeFavoriteCity } from '../entities/favorites';
import { AppDispatch } from '../app/store';
import DeleteIcon from './DeleteIcon';
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
  right: 20px;
  bottom: 60px;
  z-index: 99999;
  width: 40%;
  height: 20%;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const Favorites = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const favorites = useSelector((state: RootState) => state.favoritescities.favoritescities);

	const handleCityClick = (city: City) => {
		dispatch(addSelectedCity({ city }));
		const path = `/city/${city.name}/${city.lat}/${city.lon}`;
		navigate(path, { replace: false });
	};

	const handleDeleteClick = (cityName: string) => {
		dispatch(removeFavoriteCity({ cityName }));
	};

	return (
		<SquarWrapper>
			<p>Favorites</p>
			<SquareContainer>
				{favorites.map((item: City, index) => (
					<ListItem key={index} onClick={() => handleCityClick(item)}>
						<span>{item.name}</span>
						<DeleteIcon onClick={() => handleDeleteClick(item.name)} />
					</ListItem>
				))}
			</SquareContainer>
		</SquarWrapper>
	);
};

export default Favorites;
