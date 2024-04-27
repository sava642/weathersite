import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

interface FavoritesState {
	favoritescities: City[];
}

const loadFavoritesFromLocalStorage = (): FavoritesState => {
	const storedData = localStorage.getItem('favorites');
	if (storedData) {
		return JSON.parse(storedData);
	} else {
		return { favoritescities: [] };
	}
};

const saveFavoritesToLocalStorage = (state: FavoritesState) => {
	localStorage.setItem('favorites', JSON.stringify(state));
};

const initialState: FavoritesState = loadFavoritesFromLocalStorage();

const favoritescitiesSlice = createSlice({
	name: 'favoritescities',
	initialState,
	reducers: {
		addFavoriteCity(state, action: PayloadAction<{ city: City }>) {
			const { city } = action.payload;
			const isCityAlreadyAdded = state.favoritescities.some((c: City) => c.name === city.name);
			if (!isCityAlreadyAdded) {
				state.favoritescities.push(city);
				saveFavoritesToLocalStorage(state); // Сохраняем в localStorage
			}
		},
		removeFavoriteCity(state, action: PayloadAction<{ cityName: string }>) {
			const { cityName } = action.payload;
			state.favoritescities = state.favoritescities.filter(city => city.name !== cityName);
			saveFavoritesToLocalStorage(state); // Сохраняем в localStorage
		},
	},
});

export const { addFavoriteCity, removeFavoriteCity } = favoritescitiesSlice.actions;

export const favoritescitiesSliceReducer = favoritescitiesSlice.reducer;
