import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/reducers';
import { addSelectedCity } from '../../entities/citysearch';

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

const MyCity: React.FC = () => {
	const dispatch = useDispatch();
	const currentCityName = useSelector((state: RootState) => state.weather.name);
	const currentCityLon = useSelector((state: RootState) => state.weather.lon);
	const currentCityLat = useSelector((state: RootState) => state.weather.lat);
	const cities = useSelector((state: RootState) => state.cities.selectedCities);
	const navigate = useNavigate();

	useEffect(() => {
		const curCity: City = {
			name: currentCityName,
			lat: currentCityLat,
			lon: currentCityLon,
			country: '',
			state: '',
			local_names: {}
		};

		const searchCity = () => {
			if (cities.length === 0) {
				dispatch(addSelectedCity({ city: curCity }));
				const path = `/city/${curCity.name}/${curCity.lat}/${curCity.lon}`;
				navigate(path, { replace: true });
			} else {
				const foundCity = cities.find((city: City) =>
					(city.name.toLowerCase().normalize() === currentCityName.toLowerCase().normalize()) ||
					(Math.round(parseFloat(city.lat) * 100) / 100 === Math.round(parseFloat(currentCityLat) * 100) / 100 && // Округляем до двух цифр после запятой
						Math.round(parseFloat(city.lon) * 100) / 100 === Math.round(parseFloat(currentCityLon) * 100) / 100)
				);
				if (!foundCity) {
					dispatch(addSelectedCity({ city: curCity }));
					const path = `/city/${curCity.name}/${curCity.lat}/${curCity.lon}`;
					navigate(path);

				}
			}
		};

		if (currentCityName && currentCityLat && currentCityLon) {
			searchCity();
		}
	}, [currentCityName, currentCityLat, currentCityLon, cities, dispatch, navigate]);

	return null;
};

export default MyCity;
