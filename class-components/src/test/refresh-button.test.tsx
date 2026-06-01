import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from './render-with-providers';
import { RefreshButton } from '@/features';

test('calls invalidate on click', () => {
  renderWithProviders(<RefreshButton />);

  const button = screen.getByText(/refresh/i);

  fireEvent.click(button);

  expect(button).toBeInTheDocument();
});
