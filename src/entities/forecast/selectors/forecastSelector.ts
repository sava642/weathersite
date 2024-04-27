import { RootState } from '../../../app/reducers';

export const forecastSelector = (state: RootState) => ({
	temperature: state.weather.temperature,
	feelsLike: state.weather.feelsLike,
	humidity: state.weather.humidity,
	pressure: state.weather.pressure,
	windSpeed: state.weather.windSpeed,
	name: state.weather.name,
});
