import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import waait from 'waait'
import { render } from '../../utils/test-utils'
import UserReportFeed, { USER_REPORT_FEED_QUERY } from './UserReportFeed'

const queryData = {
  companyName: 'Company 0',
  userReport: 'This is my user report',
  city: 'Narnia City',
  state: 'BA',
  userRating: 5,
  userFeedback: 'This is the user feedback',
  date: new Date('1536894000000')
}

const userReportMock = {
  request: {
    query: USER_REPORT_FEED_QUERY,
    variables: {
      companyName: queryData.companyName
    }
  },
  result: {
    data: {
      allCustomerReports: {
        pageInfo: {
          endCursor: 'stringXYZ',
          hasNextPage: true
        },
        edges: [
          {
            node: {
              Id: 'id@123',
              companyName: queryData.companyName,
              userReport: queryData.userReport,
              city: queryData.city,
              state: queryData.state,
              userRating: queryData.userRating,
              userFeedback: queryData.userFeedback,
              date: queryData.date.toDateString()
            }
          }
        ]
      }
    }
  }
}

test('<UserReportFeed /> component renders', async () => {
  const { container, getByTestId, rerender } = render(
    <MockedProvider mocks={[userReportMock]} addTypename={false}>
      <UserReportFeed companyName={queryData.companyName} />
    </MockedProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  await waait(200)

  expect(getByTestId('feed')).toBeTruthy()
  expect(getByTestId('reports-list').children).toHaveLength(1)

  // Re-render the component with error
  delete userReportMock.result
  userReportMock.error = { error: new Error('Oh snap!') }
  rerender(
    <MockedProvider mocks={[userReportMock]} addTypename={false}>
      <UserReportFeed companyName={queryData.companyName} />
    </MockedProvider>
  )

  await waait(200)

  expect(getByTestId('graphql-error')).toBeTruthy()
})
