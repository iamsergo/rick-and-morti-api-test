export type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type ApiResultData = {
  id: number
  image: string
  url: string
  created: string
}

export type ApiResponse<T> = {
  info: Info | null
  results: (ApiResultData & T)[]
  error?: string
}

export type RequestFilters<T> = T & { page: number }