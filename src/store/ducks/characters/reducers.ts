import { combineReducers } from 'redux';
import { Info } from '../../../types/api';
import { CharacterFiltersForForm } from '../../../types/api/characters';
import { Character } from '../../../types/entities/characters';
import * as types from './types';

export type CharactersState = {
  isLoading: boolean
  hasError: boolean
  currentPage: number
  filters: CharacterFiltersForForm
  characters: Character[]
  pagination: Info | null
};

const charactersInitialState: CharactersState = {
  isLoading: false,
  hasError: false,
  currentPage: 0,
  filters: {
    name: '',
    species: '',
    type: '',
    gender: '',
    status: '',
  },
  characters: [],
  pagination: null,
};

const charactersReducer = (state: CharactersState = charactersInitialState, action: any) => {
  switch(action.type)
  {
    case types.FETCH_CHARACTERS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        currentPage: state.currentPage + 1,
      };

    case types.FETCH_CHARACTERS_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        currentPage: state.currentPage - 1,
      };

    case types.FETCH_CHARACTERS_SUCCESS:
      const { info, results } = action.payload;
      return {
        ...state,
        isLoading: false,
        hasError: false,
        characters: [
          ...state.characters,
          ...results,
        ],
        pagination: info,
      };

    case types.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,

        currentPage: 0,
        characters: [],
        pagination: null,
      };

    default:
      return state;
  }
};


export type CharacterModalState = {
  currentCharacter: Character | null
};

const characterModalInitialState = {
  currentCharacter: null,
};

const charactersModalReducer = (state: CharacterModalState = characterModalInitialState, action: any) => {
  switch(action.type)
  {
    case types.SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacter: action.payload,
      };

    default:
      return state;
  }
};

const reducer = combineReducers({
  characters: charactersReducer,
  modal: charactersModalReducer,
});

export default reducer;