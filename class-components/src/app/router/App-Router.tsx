import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { AboutPage, HomePageContainer, NotFoundPage } from '@/pages';
import { PokemonDetails } from '@/entities';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<HomePageContainer />}>
          <Route path="pokemon/:id" element={<PokemonDetails />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
