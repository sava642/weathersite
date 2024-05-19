import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GeoLocationTracker } from '../entities/location';
import WeatherForecast from '../entities/forecast/ui/WeatherForecast';
import Navigation from '../shared/Navigation';
import MyCity from '../features/myCity/myCity';


const Main = lazy(() => import('../pages/Main/Main'));
const About = lazy(() => import('../pages/About/About'));

const App: React.FC = () => {

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







