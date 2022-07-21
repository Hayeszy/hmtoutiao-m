import request from '@/utils/request'

export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResults = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
