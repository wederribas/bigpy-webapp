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
  marketSegment: 'Sales and Retail',
  year: 2018,
  reportsCount: 12345,
  reportRegion: 'NE',
  average: 2.54,
  gender: 'Male',
  ageRange: '31-40'
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
      },
      reportsPerDate: [
        {
          year: queryData.year,
          count: queryData.reportsCount
        }
      ],
      companyReportsPerRegion: [
        {
          region: queryData.reportRegion,
          count: queryData.reportsCount
        }
      ],
      companyRatingPerYear: [
        {
          year: queryData.year,
          average: queryData.average
        }
      ],
      companyReportsPerGender: [
        {
          gender: queryData.gender,
          count: queryData.reportsCount
        }
      ],
      companyReportsPerAge: [
        {
          ageRange: queryData.ageRange,
          count: queryData.reportsCount
        }
      ]
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
