export type None<T> = { [P in keyof T]: T[P] | '' }