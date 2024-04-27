import { combineReducers } from '@reduxjs/toolkit';
import { citiesSliceReducer } from '../entities/citysearch/slice/citiesSlice';
import { weatherSliceReducer } from '../entities/forecast';
import { locationSliceReducer } from '../entities/location';
import { favoritescitiesSliceReducer } from "../entities/favorites";

const rootReducer = combineReducers({
	location: locationSliceReducer,
	weather: weatherSliceReducer,
	cities: citiesSliceReducer,
	favoritescities: favoritescitiesSliceReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
