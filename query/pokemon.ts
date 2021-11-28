import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createGetPokemonRequest } from '../api/pokemon';
import { Pokemon, PokemonRequest } from '../types/pokemon';
import { TestOptions } from '../types/test';

export const useGetPokemon = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ search, testOptions = {} }: PokemonRequest & TestOptions) => {
      const { data } = await createGetPokemonRequest<Pokemon>({ search, testOptions });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('pokemon');
      },
    },
  );
};
