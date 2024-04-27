
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/reducers';
import { fetchWeather } from '../fetchWeather';
import { AppDispatch } from '../../../app/store';

const WeatherForecast: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const { latitude, longitude } = useSelector((state: RootState) => state.location);
	const currentCity = useSelector((state: RootState) => state.cities.currentCity);

	useEffect(() => {
		if (currentCity) {
			dispatch(fetchWeather({ latitude: +currentCity.lat, longitude: +currentCity.lng }));
		}
	}, [currentCity, dispatch]);


	useEffect(() => {
		if (latitude && longitude) {
			dispatch(fetchWeather({ latitude, longitude }));
		}
	}, [latitude, longitude, dispatch]);


	return null
}

export default WeatherForecast;