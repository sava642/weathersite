import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { GeoLocationTracker } from '../entities/location';
import WeatherForecast from '../entities/forecast/ui/WeatherForecast';
import Navigation from '../shared/Navigation';
import MyCity from '../features/myCity/myCity';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';
import { Outlet } from 'react-router-dom';
import CityDetail from '../shared/CityDetail';

const Main = lazy(() => import('../pages/Main/Main'));
const About = lazy(() => import('../pages/About/About'));

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentCity = useSelector((state: RootState) => state.cities.currentCity);

  // useEffect(() => {
  //   // Выполняем навигацию только при монтировании компонента
  //   if (currentCity) {
  //     const path = `/city/${currentCity.name}/${currentCity.lat}/${currentCity.lon}`;
  //     navigate(path, { replace: false });
  //   }
  // }, [currentCity, navigate]);

  return (
    <>
      <GeoLocationTracker />
      <WeatherForecast />
      <MyCity />
      <Suspense fallback={<div style={{ margin: '20px' }}>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="city/:name/:lat/:lon" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;







