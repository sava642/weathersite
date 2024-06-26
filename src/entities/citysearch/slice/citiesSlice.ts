import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
			state.selectedCities.push(city);
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
