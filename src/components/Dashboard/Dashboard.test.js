import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'
import { render } from '../../utils/test-utils'
import Dashboard, { DASHBOARD_QUERY } from './Dashboard'

const queryData = {
  companyName: 'Company 0',
  totalReportsCount: 1000
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
      totalCompanyReports: queryData.totalReportsCount
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
  expect(getByTestId('reports-count')).toHaveTextContent(
    queryData.totalReportsCount
  )

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
