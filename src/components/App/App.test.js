import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'react-testing-library'
import { mocks } from '../../utils/graphql-test-mocks'
import App from './App'

test('renders without crashing', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
