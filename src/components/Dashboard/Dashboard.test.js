import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'
import { render } from '../../utils/test-utils'
import Dashboard, { dashboardQuery } from './Dashboard'

const queryData = {
  companyName: 'Company 0',
  userReport: 'This is my user report',
  userRating: 5,
  userFeedback: 'This is the user feedback',
  totalReportsCount: 1000
}

const mocks = {
  request: {
    query: dashboardQuery,
    variables: {
      companyName: queryData.companyName
    }
  },
  result: {
    data: {
      allCustomerReports: {
        pageInfo: {
          endCursor: 'stringXYZ'
        },
        edges: [
          {
            node: {
              Id: 'id@123',
              companyName: queryData.companyName,
              userReport: queryData.userReport,
              userRating: queryData.userRating,
              userFeedback: queryData.userFeedback
            }
          }
        ]
      },
      companyReportsCount: {
        edges: [{ node: { count: queryData.totalReportsCount } }]
      }
    }
  }
}

test('Dashboard renders with all data', async () => {
  const match = { params: { companyName: 'Company 0' } }

  const { container, getByTestId, rerender } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <Dashboard match={match} />
    </MockedProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  await wait(200)

  expect(getByTestId('company-name')).toHaveTextContent(queryData.companyName)
  expect(getByTestId('reports-count')).toHaveTextContent(
    queryData.totalReportsCount
  )

  expect(container.firstChild).toMatchSnapshot()

  // Re-render the components without the query variables
  // in order to cause a GraphQL error
  mocks.request.variables = {}
  rerender(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <Dashboard match={match} />
    </MockedProvider>
  )

  await wait(200)

  expect(getByTestId('graphql-error')).toBeTruthy()
})
