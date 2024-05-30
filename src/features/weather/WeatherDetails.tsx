import React from 'react';
import { useSelector } from 'react-redux';
import { forecastSelector } from '../../entities/forecast';
import { Spinner } from '../../shared/Spinner';
import styled from 'styled-components';

const WeatherDetailsContainer = styled.div`
  position: absolute;
  z-index: 9999;
  top: 20%;
  right: 10px;
  transform: translateY(-80%);
  ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
 }

 li {
	text-decoration: none;
	color: #333;
`;

const WeatherDetails = () => {
	const { name, temperature, feelsLike, humidity, pressure, windSpeed } = useSelector(forecastSelector);

	const convertToCelsius = (temp: number) => Math.round(temp - 273.15);

	if (!name || !temperature || !feelsLike || !humidity || !pressure || !windSpeed) {
		return <Spinner />;
	}

	return (
		<WeatherDetailsContainer>
			<p>{name}</p>
			<ul>
				<li>Temperature: {convertToCelsius(temperature)} °C</li>
				<li>Feels like: {convertToCelsius(feelsLike)} °C</li>
				<li>Humidity: {humidity}%</li>
				<li>Pressure: {pressure} hPa</li>
				<li>Wind speed: {windSpeed} m/s</li>
			</ul>
		</WeatherDetailsContainer>
	);
};

export default WeatherDetails;


