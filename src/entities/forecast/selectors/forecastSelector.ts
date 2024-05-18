import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/reducers';

export const forecastSelector = createSelector(
	(state: RootState) => state.weather, // Выбираем все данные погоды
	(weather) => ({
		temperature: weather.temperature,
		feelsLike: weather.feelsLike,
		humidity: weather.humidity,
		pressure: weather.pressure,
		windSpeed: weather.windSpeed,
		name: weather.name,
	})
);
