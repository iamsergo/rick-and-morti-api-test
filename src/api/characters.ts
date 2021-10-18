import { CharacterRequestFilters, CharacterResponse } from "../types/api/characters";

export const getCharacters = async (
  { page, ...filters }: CharacterRequestFilters
): Promise<CharacterResponse> => {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;

  Object.entries(filters)
    .filter(([,value]) => value)
    .forEach(([key, value]) => {
      url += `&${key}=${value}`;
    });

  const res = await fetch(url);
  const data = await res.json();

  return data as CharacterResponse;
}