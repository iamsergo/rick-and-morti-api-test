import { CharacterFilters, CharacterRequestFilters, CharacterResponse } from '../../../types/api/characters';
import { Character } from '../../../types/entities/characters';
import * as types from './types';

const fetchCharacters = (params: CharacterRequestFilters) => ({
  type: types.FETCH_CHARACTERS,
  payload: params,
});

const fetchCharactersSuccess = (data: CharacterResponse) => ({
  type: types.FETCH_CHARACTERS_SUCCESS,
  payload: data,
});

const fetchCharactersFail = () => ({
  type: types.FETCH_CHARACTERS_FAIL,
});

const setFilters = (filters: CharacterFilters) => ({
  type: types.SET_FILTERS,
  payload: filters,
});

const setCurrentCharacter = (character: Character | null) => ({
  type: types.SET_CURRENT_CHARACTER,
  payload: character,
});

export {
  fetchCharacters,
  fetchCharactersSuccess,
  fetchCharactersFail,
  setFilters,
  setCurrentCharacter,
}