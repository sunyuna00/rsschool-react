import {
  mapPokemon,
  type Pokemon,
  type PokemonListItem,
  type PokemonListResponse,
  type PokemonRaw,
} from '@/entities';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL ?? 300);

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ['Pokemon'],

  endpoints: (builder) => ({
    searchPokemon: builder.query<Pokemon[], string>({
      keepUnusedDataFor: CACHE_TTL,

      async queryFn(search, _api, _extraOptions, fetchWithBQ) {
        try {
          const query = search.trim().toLowerCase();

          if (query) {
            const exactResponse = await fetchWithBQ(`/pokemon/${query}`);

            if (exactResponse.data) {
              const pokemon = exactResponse.data as PokemonRaw;

              return {
                data: [mapPokemon(pokemon)],
              };
            }
          }

          const listResponse = await fetchWithBQ('/pokemon?limit=1300');

          if (!listResponse.data) {
            return {
              error: {
                status: 500,
                data: 'Failed to load pokemon list',
              },
            };
          }

          const pokemonList = listResponse.data as PokemonListResponse;

          const filteredPokemons = pokemonList.results.filter(({ name }) => name.includes(query));

          if (!filteredPokemons.length) {
            return {
              error: {
                status: 404,
                data: 'Pokemon not found',
              },
            };
          }

          const detailedResponses = await Promise.all(
            filteredPokemons.map(async (pokemon: PokemonListItem) => {
              const response = await fetchWithBQ(pokemon.url);

              return response.data as PokemonRaw;
            })
          );

          return {
            data: detailedResponses.map(mapPokemon),
          };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Failed to load pokemons',
            },
          };
        }
      },

      providesTags: ['Pokemon'],
    }),

    getPokemonById: builder.query<Pokemon, string>({
      keepUnusedDataFor: CACHE_TTL,

      async queryFn(id, _api, _extraOptions, fetchWithBQ) {
        const response = await fetchWithBQ(`/pokemon/${id}`);

        if (response.error) {
          return {
            error: response.error,
          };
        }

        return {
          data: mapPokemon(response.data as PokemonRaw),
        };
      },

      providesTags: (_result, _error, id) => [{ type: 'Pokemon', id }],
    }),

    invalidatePokemon: builder.mutation<void, void>({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: ['Pokemon'],
    }),
  }),
});

export const { useSearchPokemonQuery, useGetPokemonByIdQuery, useInvalidatePokemonMutation } =
  pokemonApi;
