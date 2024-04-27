import { RootState } from '../../../app/reducers';

export const selectedCitiesSelector = (state: RootState) => state.cities.selectedCities;

export const currentCitySelector = (state: RootState) => state.cities.currentCity;
