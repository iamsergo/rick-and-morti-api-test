import { ApiResponse, RequestFilters } from "./index"
import { Character } from "../entities/characters"
import { None } from "../common"

export type CharacterFilters = Partial<Omit<Character, 'origin' | 'location'>>

export type CharacterRequestFilters = RequestFilters<CharacterFilters & { gender: Character['gender'] | '' }>

export type CharacterResponse = ApiResponse<Character>

type TypesForSelect = 'gender' | 'status'
export type CharacterFiltersForForm = Omit<CharacterFilters, TypesForSelect> & None<Pick<CharacterFilters, TypesForSelect>>