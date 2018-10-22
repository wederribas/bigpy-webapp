import { getCompaniesQuery } from '../components/Search/Search'

export const mocks = [
  {
    request: {
      query: getCompaniesQuery
    },
    result: {
      data: {
        allCompaniesNames: {
          edges: [
            { node: { Id: 'Company 0' } },
            { node: { Id: 'Company 1' } },
            { node: { Id: 'Company 2' } }
          ]
        }
      }
    }
  }
]
