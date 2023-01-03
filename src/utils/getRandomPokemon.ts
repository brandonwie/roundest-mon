export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne?: number
) => {
  // select random number from range javascript
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  const MIN_DEX_ID = 1;
  const MAX_DEV_ID = 493;
  const pokedexNumber =
    Math.floor(Math.random() * (MAX_DEV_ID - MIN_DEX_ID + 1)) + MIN_DEX_ID;
  if (pokedexNumber === notThisOne) {
    return getRandomPokemon(notThisOne);
  }
  return pokedexNumber;
};

export const getOptionsForVote: () => [number, number] = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);

  return [firstId, secondId];
};
