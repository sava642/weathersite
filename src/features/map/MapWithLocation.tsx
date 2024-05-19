import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { fetchWeather } from '../../entities/forecast/fetchWeather';
import { AppDispatch } from '../../app/store';
import { useParams } from 'react-router-dom';
const customIcon = new Icon({
	iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png',
	iconSize: [24, 24], // Размер иконки
});

const MapWithLocation: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const mapRef = useRef<any>();
	const { lat, lon } = useParams<{ lat?: string; lon?: string }>(); // Обновляем типы параметров

	const [position, setPosition] = useState<[number, number]>([0, 0]); // Устанавливаем начальные координаты

	useEffect(() => {
		// Если lat и lon определены, обновляем позицию
		if (lat && lon) {
			const latFloat = parseFloat(lat);
			const lonFloat = parseFloat(lon);
			setPosition([latFloat, lonFloat]);
			dispatch(fetchWeather({ latitude: latFloat, longitude: lonFloat }));
		}
	}, [lat, lon, dispatch]);

	const handleMarkerDrag = (e: any) => {
		const newPosition = e.target.getLatLng();
		dispatch(fetchWeather({ latitude: newPosition.lat, longitude: newPosition.lng }));
	};

	useEffect(() => {
		// Центрируем карту при обновлении позиции маркера
		if (mapRef.current) {
			mapRef.current.setView(position);
		}
	}, [position]);
	return (
		<div className="custom-map-container" >
			<MapContainer center={position} zoom={3} style={{ width: '100%', height: '100%' }} ref={mapRef}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={position} icon={customIcon} draggable={true} eventHandlers={{ dragend: handleMarkerDrag }}>
					<Popup>Your location</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapWithLocation;



