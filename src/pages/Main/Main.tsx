import React from 'react';

import { CitySearch } from '../../entities/citysearch';
import MapWithLocation from '../../features/map/MapWithLocation';
import WeatherDetails from '../../features/weather/WeatherDetails';
import AddIcon from '../../shared/AddIcon';
import Favorites from '../../shared/Favorites';
import ResentResults from '../../shared/ResentResults';
import { addFavoriteCity } from '../../entities/favorites'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import { AppDispatch } from '../../app/store';
import CityDetail from '../../shared/CityDetail';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const currentCity = useSelector((state: RootState) => state.cities.currentCity);
	const handleAddClick = () => {
		if (currentCity !== null) {
			dispatch(addFavoriteCity({ city: currentCity }));
		}
	}
	return (
		<div style={{ position: 'relative' }}>
			<MapWithLocation />
			<CitySearch />
			<ResentResults />

			<Favorites />
			<AddIcon onClick={() => handleAddClick()} />
			<WeatherDetails />
			<Outlet /> {/* Добавлено для рендеринга вложенных маршрутов */}
		</div>
	);
}

export default Main;
