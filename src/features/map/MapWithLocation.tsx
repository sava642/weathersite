import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Icon } from 'leaflet';




const MapWithLocation: React.FC = () => {

	const customIcon = new Icon({
		iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png',
		iconSize: [24, 24], // Размер иконки
	});
	const { latitude, longitude } = useSelector((state: RootState) => state.location);
	const currentCity = useSelector((state: RootState) => state.cities.currentCity);
	const [position, setPosition] = useState<[number, number]>([latitude || 0, longitude || 0]);

	const handleMarkerDrag = (e: any) => {
		const newPosition = e.target.getLatLng(); // Получаем новые координаты метки
		console.log([newPosition.lat, newPosition.lng])
	};
	useEffect(() => {
		// После 2 секунд проверяем, доступны ли данные о местоположении
		const timer = setTimeout(() => {
			if (latitude !== null && longitude !== null) {
				setPosition([latitude, longitude]); // Обновляем позицию с данными о местоположении
			}
		}, 2000);

		return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
	}, [latitude, longitude]);

	useEffect(() => {
		if (currentCity) {
			setPosition([parseFloat(currentCity.lat), parseFloat(currentCity.lng)]);
		}
	}, [currentCity]);

	return (
		<div className="custom-map-container" >
			<MapContainer center={position} zoom={2} style={{ width: '100%', height: '100%' }}>
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

