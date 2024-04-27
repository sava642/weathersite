import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GeoLocationTracker } from '../entities/location';
import WeatherForecast from '../entities/forecast/ui/WeatherForecast';
import Navigation from '../shared/Navigation';
import MyCity from '../features/myCity/myCity';

const Main = lazy(() => import('../pages/Main/Main'));
const About = lazy(() => import('../pages/About/About'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ margin: '20px' }}>Loading...</div>}>
      <GeoLocationTracker />
      <WeatherForecast />
      <MyCity />
      <Navigation />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;





