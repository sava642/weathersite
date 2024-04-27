import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/reducers';
import { addSelectedCity } from '../entities/citysearch';
import { useNavigate } from 'react-router-dom';

interface City {
	name: string;
	lat: string;
	lng: string;
	country: string;
	admin1: string;
	admin2: string;
}

const SquareContainer = styled.div`
	border-radius: 10px;
	background-color: #00ccff;
	z-index: 99999;
	overflow: auto;
	width: 100%;
	height: 100%;
`;
const SquarWrapper = styled.div`
	position: absolute;
	left: 20px;
	bottom: 140px;
	z-index: 99999;
	width: 40%;
	height: 20%;
`;

const ListItem = styled.div`
	padding: 10px;
	border-bottom: 1px solid #ccc;
	cursor: pointer;
`;

const ResentResults = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);

	useEffect(() => {
		// При изменении списка selectedCities добавляем новые города в историю поиска
		selectedCities.forEach((city: City) => {
			addCityToHistory(city);
		});

		// Добавляем обработчик события popstate для отслеживания изменений в истории браузера
		window.addEventListener('popstate', handlePopstate);

		// Убираем обработчик события popstate при размонтировании компонента
		return () => {
			window.removeEventListener('popstate', handlePopstate);
		};
	}, [selectedCities]);

	const addCityToHistory = (city: City) => {
		// Добавляем выбранный город в историю браузера
		const newCities = [...selectedCities, city];
		const state = { cities: newCities };
		window.history.pushState(state, '', ''); // Пустая строка для URL
	};

	const handleCityClick = (city: City) => {
		console.log(city)
		dispatch(addSelectedCity({ city }));
	};

	const handlePopstate = (event: PopStateEvent) => {
		// Вызывается при изменении состояния истории браузера (нажатие кнопок "вперед" или "назад")
		const state = event.state;
		if (state && state.cities) {
			console.log('Popstate event - cities:', state.cities);
		}
	};
	console.log(window.history)
	return (
		<SquarWrapper>
			<p>Resent results</p>
			<SquareContainer>
				{selectedCities.map((item: City, index) => (
					<ListItem key={index} onClick={() => handleCityClick(item)} >
						{item.name}
					</ListItem>
				))}
			</SquareContainer>
		</SquarWrapper>
	);
};

export default ResentResults;
