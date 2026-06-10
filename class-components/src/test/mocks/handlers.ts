import { http, HttpResponse } from 'msw';

const pokemonResponse = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  weight: 60,
  height: 4,
  abilities: [{ ability: { name: 'static' } }],
};

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' }],
    });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
    return HttpResponse.json(pokemonResponse);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/25', () => {
    return HttpResponse.json(pokemonResponse);
  }),
];
