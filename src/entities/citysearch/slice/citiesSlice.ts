import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

interface LocationState {
	selectedCities: City[];
	currentCity: City | null; // Обновляем тип currentCity
}

const initialState: LocationState = {
	selectedCities: [],
	currentCity: null, // Обновляем инициализацию currentCity
};

const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		addSelectedCity(state, action: PayloadAction<{ city: City }>) {
			const { city } = action.payload;
			state.currentCity = city;
			const isCityAlreadyAdded = state.selectedCities.some((c: City) => c.name === city.name);
			if (isCityAlreadyAdded) {
				return;
			}
			// Если город еще не добавлен, добавляем его
			state.selectedCities.push(city);
			// Если количество городов больше 5, удаляем первый город из массива
			if (state.selectedCities.length > 5) {
				state.selectedCities.shift();
			}
		},
		removeSelectedCity(state, action: PayloadAction<{ cityName: string }>) {
			state.selectedCities = state.selectedCities.filter(city => city.name !== action.payload.cityName);
		},
		clearSelectedCities(state) {
			state.selectedCities = [];
		}
	}
});

export const { addSelectedCity, removeSelectedCity, clearSelectedCities } = citiesSlice.actions;

export const citiesSliceReducer = citiesSlice.reducer;
