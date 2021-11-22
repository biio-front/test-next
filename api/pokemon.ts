import { createHttpRequest } from './common';
import { Apis } from '../types/api';
import { TestOptions } from '../types/test';
import { PokemonRequest } from '../types/pokemon';

export const POKEMON_APIS: Apis = {
  getPokemon: { method: 'GET', url: '/pokemon/:search' },
};

export const createGetPokemonRequest = <T>({
  search,
  testOptions = {},
}: PokemonRequest & TestOptions) => {
  const params = { search };
  return createHttpRequest<T>({ ...POKEMON_APIS.getPokemon, params }, testOptions);
};
