import type { Pokemon } from '@/entities';

export const downloadCsv = (items: Pokemon[]) => {
  if (items.length === 0) {
    return;
  }
  const headers = ['ID', 'Name', 'Types', 'Abilities', 'Height', 'Weight', 'Details URL'];

  const rows = items.map((pokemon) => [
    pokemon.id,
    pokemon.name,
    pokemon.types.join(', '),
    pokemon.abilities.join(', '),
    pokemon.height,
    pokemon.weight,
    `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
  ]);

  const csvContent = [headers.join(', '), ...rows.map((row) => row.join(', '))].join('/n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.setAttribute('download', `${items.length}_items.csv`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
