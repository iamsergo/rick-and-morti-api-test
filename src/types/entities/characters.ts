// characters
export type Status = 'Alive' | 'Dead' | 'unknown'

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export type CharacterLocation = {
  name: string
  url: string
}

export type CharacterOrigin = {
  name: string
  url: string
}

export type Character = {
  name: string
  species: string
  type: string
  status: Status
  gender: Gender
  origin: CharacterOrigin
  location: CharacterLocation
}