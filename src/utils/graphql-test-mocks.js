import { getCompaniesNamesQuery } from '../components/Search/Search'

export const mocks = [
  {
    request: {
      query: getCompaniesNamesQuery
    },
    result: {
      data: {
        companiesNames: ['Company 0', 'Company 1', 'Company 2']
      }
    }
  }
]
