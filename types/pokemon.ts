export type PokemonRequest = {
  search?: string;
};

export type PokemonRequestForInitialData = {
  initialData: Pokemon;
};

export type Pokemon = {
  species: {
    name: string;
  };
  sprites: {
    front_shiny: string;
  };
};
