import { downloadCsv } from '@/features';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Pokemon } from '@/entities';

const pokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  image: 'pikachu.png',
  types: ['electric'],
  abilities: ['static'],
  height: 4,
  weight: 60,
};

describe('downloadCsv', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should return early when items is empty', () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild');

    downloadCsv([]);

    expect(appendSpy).not.toHaveBeenCalled();
  });

  it('should trigger download flow', () => {
    const clickSpy = vi.fn();
    const setAttributeSpy = vi.fn();

    const link = document.createElement('a');

    link.click = clickSpy;
    link.setAttribute = setAttributeSpy;

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);

    const appendSpy = vi.spyOn(document.body, 'appendChild');

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    downloadCsv([pokemon]);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'download',
      '1_items.csv'
    );
    expect(clickSpy).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
  });
});
