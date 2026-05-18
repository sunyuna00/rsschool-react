import { useSearchParams } from 'react-router-dom';
import { HomePage } from './home-page';

export const HomePageContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';

  return (
    <HomePage
      initialSearch={search}
      onSearch={(value) => {
        setSearchParams({
          search: value,
        });
      }}
    />
  );
};
