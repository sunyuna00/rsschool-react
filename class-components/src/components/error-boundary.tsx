import { AlertTriangle } from 'lucide-react';
import React from 'react';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  override state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    console.error('Error caught:', error);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
          <div className="max-w-md bg-card border border-primary/10 rounded-3xl p-8 shadow-lg shadow-primary/5">
            <div className="flex justify-center mb-4 text-primary">
              <AlertTriangle size={40} />
            </div>

            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

            <p className="text-sm text-muted-foreground mb-6">
              Don’t worry — you can try again or reload the page.
            </p>

            <button
              onClick={this.resetError}
              className="w-full px-5 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20
                         transition-all duration-200 hover:scale-[1.02] hover:bg-primary/15 hover:border-primary/30
                         active:scale-95"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
