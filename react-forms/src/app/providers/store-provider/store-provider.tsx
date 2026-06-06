import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};