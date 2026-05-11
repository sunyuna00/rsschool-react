import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ErrorBoundary } from '../error-boundary';

describe('ErrorBoundary', () => {
  const ProblemComponent = () => {
    throw new Error('Test error');
  };

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/normal content/i)).toBeInTheDocument();
  });

  test('renders fallback UI when error happens', () => {

    const consoleSpy = vi.spyOn(console, 'error');

    consoleSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/something went wrong/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  test('calls console.error when error is caught', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    consoleSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  test('clicking try again button keeps fallback UI if error still exists', async () => {
    const user = userEvent.setup();

    const consoleSpy = vi.spyOn(console, 'error');

    consoleSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', {
      name: /try again/i,
    });

    await user.click(button);

    expect(
      screen.getByText(/something went wrong/i)
    ).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
