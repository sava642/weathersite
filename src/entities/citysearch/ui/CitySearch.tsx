import React, { useState } from 'react';
import cities from 'cities.json';
import { useDispatch } from 'react-redux';
import { addSelectedCity } from '../slice/citiesSlice';
import { AppDispatch } from '../../../app/store';
import styled from 'styled-components';


const SearchContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
	 z-index: 999;
	 ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		
	 }

	 li {
		padding: 10px;
		text-decoration: none;
		color: #333;
		transition: color 0.3s ease;
  cursor:pointer;
		&:hover {
		  color: #007bff;
		}
  
	 }
`;

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

const citiesArray: City[] = cities as City[];

const CitySearch: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		// Фильтруем города по введенному значению
		const filteredCities = citiesArray.filter((city: City) =>
			city.name.toLowerCase().includes(value.toLowerCase())
		);
		// Ограничиваем количество отображаемых подсказок
		const limitedSuggestions = filteredCities.slice(0, 5).map((city) => city.name);
		setSuggestions(limitedSuggestions);
	};

	const handleCitySelect = (cityName: string) => {
		// Отправляем выбранный город в Redux
		const selectedCity = citiesArray.find((city) => city.name === cityName);
		if (selectedCity) {
			// Отправляем выбранный город в Redux
			dispatch(addSelectedCity({ city: selectedCity }));
			console.log(`Selected city: ${selectedCity.name}, Latitude: ${selectedCity.lat}, Longitude: ${selectedCity.lng}`);
		}
		// Очищаем поле поиска и подсказки
		setSearchTerm('');
		setSuggestions([]);
	};

	return (
		<SearchContainer >
			<input
				type="text"
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder="Search for a city"
			/>
			<ul>
				{suggestions.map((city, index) => (
					<li key={index} onClick={() => handleCitySelect(city)}>
						{city}
					</li>
				))}
			</ul>
		</SearchContainer>
	);
};

export default CitySearch;

