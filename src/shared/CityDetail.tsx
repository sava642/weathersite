import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  left: 20px;
  bottom: 220px;
  z-index: 99999;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CityDetail = () => {
	const navigate = useNavigate();
	const { name, lat, lon } = useParams<{ name: string; lat: string; lon: string }>();

	const handleGoBack = () => {
		navigate(-1); // Перейти на предыдущую страницу в истории браузера
	};

	return (
		<Container>
			<h2>City: {name}</h2>
			<p>Latitude: {lat}</p>
			<p>Longitude: {lon}</p>
			<button onClick={handleGoBack}>Back</button>
			{/* Дополнительная информация о городе */}
		</Container>
	);
};

export default CityDetail;

