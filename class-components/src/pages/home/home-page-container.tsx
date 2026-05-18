import { useSearchParams } from 'react-router-dom';
import { HomePage } from './home-page';

export const HomePageContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (trimmedValue) {
        params.set('search', trimmedValue);
      } else {
        params.delete('search');
      }

      return params;
    });
  };

  return (
    <HomePage
      initialSearch={search}
      onSearch={handleSearch}
    />
  );
};
