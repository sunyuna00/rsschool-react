import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { AboutPage, HomePageContainer, NotFoundPage } from '@/pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePageContainer />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
