import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
interface Coordinates {
	latitude: number;
	longitude: number;
}

export const fetchWeather = createAsyncThunk(
	'weather/fetchWeather',
	async ({ latitude, longitude }: Coordinates) => {


		try {
			const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
			console.log(response.data)
			return response.data; // Возвращаем полученные данные
		} catch (error) {
			throw new Error('Failed to fetch weather data'); // Обработка ошибки при получении данных
		}
	}
);