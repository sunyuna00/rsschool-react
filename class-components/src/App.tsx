import { Routes, Route } from 'react-router-dom';
import { AboutPage, HomePageContainer, NotFoundPage, PokemonDetails } from './pages';
import { AppLayout } from './components/layout/app-layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path='/' element={<HomePageContainer />}>
          <Route path="details/:id" element={<PokemonDetails />} />
        </Route>

        <Route path="about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
