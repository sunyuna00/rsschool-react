import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/app';
import { App, ErrorBoundary } from '@/app';
import { AppProviders } from './app/providers/app-providers';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </BrowserRouter>
);
