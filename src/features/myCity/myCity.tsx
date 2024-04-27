import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cities from 'cities.json';
import { addSelectedCity } from '../../entities/citysearch';
import { RootState } from '../../app/reducers';

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

const citiesArray: City[] = cities as City[];

const MyCity: React.FC = () => {
	const dispatch = useDispatch();
	const { name } = useSelector((state: RootState) => state.weather);

	useEffect(() => {
		const searchCity = () => {
			const foundCity = citiesArray.find((city: City) => city.name === name);
			if (foundCity) {
				console.log(foundCity);
				dispatch(addSelectedCity({ city: foundCity }));
			}
		};

		if (name) {
			searchCity();
		}
	}, [name, dispatch]);

	return null;
};

export default MyCity;

