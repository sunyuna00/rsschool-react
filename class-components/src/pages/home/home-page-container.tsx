import { useSearchParams } from 'react-router-dom';
import { HomePage } from './home-page';

export const HomePageContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const handleSearch = (value: string) => {
    const trimmed = value.trim();

    setSearchParams((params) => {
      const next = new URLSearchParams(params);

      if (trimmed) {
        next.set('search', trimmed);
        next.set('page', '1');
      } else {
        next.delete('search');
        next.set('page', '1');
      }

      return next;
    });
  };

  return (
    <HomePage
      initialSearch={search}
      onSearch={handleSearch}
    />
  );
};
