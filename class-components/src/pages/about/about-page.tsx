export const AboutPage = () => {
  return (
    <div className="p-6 space-y-4 max-w-xl">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="text-gray-700">
        Pokémon Search Application built with React. The project is focused on
        learning routing, hooks, and working with API data in a single-page application.
      </p>

      <p className="text-gray-700">
        It includes search, pagination, and a details view for each Pokémon,
        using data from PokéAPI.
      </p>

      <div className="pt-2">
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline hover:opacity-80 transition"
        >
          RS School React Course
        </a>
      </div>
    </div>
  );
};
