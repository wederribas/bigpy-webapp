import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'
import { render } from '../../utils/test-utils'
import Dashboard, { DASHBOARD_QUERY } from './Dashboard'

const queryData = {
  companyName: 'Company 0',
  totalReportsCount: 1000,
  totalCompanyReplies: 900,
  overallCompanyRating: 4.5,
  marketSegment: 'Sales and Retail'
}

const dashboardMock = {
  request: {
    query: DASHBOARD_QUERY,
    variables: {
      companyName: queryData.companyName
    }
  },
  result: {
    data: {
      totalCompanyReports: queryData.totalReportsCount,
      totalCompanyReplies: queryData.totalCompanyReplies,
      overallCompanyRating: queryData.overallCompanyRating,
      allCompanyReports: {
        edges: [
          {
            node: {
              marketSegment: queryData.marketSegment
            }
          }
        ]
      }
    }
  }
}

test('<Dashboard /> component renders', async () => {
  const match = { params: { companyName: 'Company 0' } }

  const { container, getByTestId, rerender } = render(
    <MockedProvider mocks={[dashboardMock]} addTypename={false}>
      <Dashboard match={match} />
    </MockedProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  await wait(200)

  expect(getByTestId('company-name')).toHaveTextContent(queryData.companyName)
  expect(getByTestId('company-market-segment')).toHaveTextContent(
    queryData.marketSegment
  )
  expect(getByTestId('company-overall-rating')).toBeTruthy()
  expect(getByTestId('company-response-rate')).toBeTruthy()

  // Re-render the components without the query variables
  // in order to cause a GraphQL error
  dashboardMock.request.variables = {}
  rerender(
    <MockedProvider mocks={[dashboardMock]} addTypename={false}>
      <Dashboard match={match} />
    </MockedProvider>
  )

  await wait(200)

  expect(getByTestId('graphql-error')).toBeTruthy()
})
