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
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong.</h2>

          <button
            onClick={this.resetError}
            className="bg-destructive text-destructive-foreground px-5 py-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,77,109,0.25)] active:scale-95"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
