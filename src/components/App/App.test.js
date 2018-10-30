import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'react-testing-library'
import App from './App'

test('renders without crashing', () => {
  const { container } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
