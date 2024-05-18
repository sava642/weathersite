import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../fetchWeather';


interface WeatherState {
	temperature: number;
	feelsLike: number;
	humidity: number;
	pressure: number;
	windSpeed: number;
	name: string;
	lat: string;
	lon: string;
}

const initialState: WeatherState = {
	temperature: 0,
	feelsLike: 0,
	humidity: 0,
	pressure: 0,
	windSpeed: 0,
	lat: "",
	lon: "",
	name: "",
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWeather.fulfilled, (state, action) => {
			state.temperature = action.payload.main.temp;
			state.feelsLike = action.payload.main.feels_like;
			state.humidity = action.payload.main.humidity;
			state.pressure = action.payload.main.pressure;
			state.windSpeed = action.payload.wind.speed;
			state.lat = action.payload.coord.lat;
			state.lon = action.payload.coord.lon;
			state.name = action.payload.name;

		});
	},
});

export const weatherSliceReducer = weatherSlice.reducer;
