import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSelectedCity } from '../slice/citiesSlice';
import { AppDispatch } from '../../../app/store';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
		cursor: pointer;
		&:hover {
		  color: #007bff;
		}
	 }
`;

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
const APIKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const CitySearch: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState<string>(''); // Устанавливаем начальное значение пустой строки
	const [suggestions, setSuggestions] = useState<City[]>([]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			// Запускаем поиск при нажатии клавиши Enter
			handleSearchSubmit();
		}
	};

	const handleSearchSubmit = () => {
		if (searchTerm.trim() !== '') {
			axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${APIKey}`)
				.then(response => {
					const data = response.data;
					setSuggestions(data)
				})
				.catch(error => console.error('Error fetching data:', error));
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleCitySelect = (city: City) => {
		dispatch(addSelectedCity({ city }));
		setSearchTerm('');
		setSuggestions([]);
		const path = `/city/${city.name}/${city.lat}/${city.lon}`;
		navigate(path, { replace: false });
	};

	return (
		<SearchContainer>
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="Search for a city"
			/>
			<button onClick={handleSearchSubmit}>Search</button>
			<ul>
				{suggestions.map((city, index) => (
					<li onClick={() => handleCitySelect(city)} key={index}>
						{city.name} {city.state ? `(${city.state})` : null}
					</li>
				))}
			</ul>
		</SearchContainer>
	);
};

export default CitySearch;


