import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation, setLocationError } from '../slice/locationSlice';

const GeoLocationTracker: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const successHandler = (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;
			dispatch(setLocation({ latitude, longitude }));
		};

		const errorHandler = (error: GeolocationPositionError) => {
			console.error('Error getting geolocation:', error.message);
			dispatch(setLocationError(error.message));
			if (error.message) {
				alert('You have denied access to your location. Please enable it to use this feature.');
			}
		};

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, [dispatch]);

	return null;
}

export default GeoLocationTracker;
