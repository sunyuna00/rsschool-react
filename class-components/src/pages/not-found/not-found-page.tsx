import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>

      <p>Page not found</p>

      <Link
        to="/"
        className="rounded-full border border-primary/20 px-6 py-3"
      >
        Go Home
      </Link>
    </div>
  );
};
