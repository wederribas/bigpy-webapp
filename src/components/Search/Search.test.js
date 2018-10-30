import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Simulate } from 'react-dom/test-utils'
import { fireEvent } from 'react-testing-library'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from '../../utils/test-utils'
import Search, { getCompaniesNamesQuery } from './Search'

const mocks = {
  request: {
    query: getCompaniesNamesQuery
  },
  result: {
    data: {
      companiesNames: ['Company 0', 'Company 1', 'Company 2']
    }
  }
}

test('Search bar filtering', async () => {
  const { container, getByTestId, getByText, rerender } = render(
    <MemoryRouter>
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Search />
      </MockedProvider>
    </MemoryRouter>
  )

  expect(container.firstChild).toMatchSnapshot()

  await wait(200)

  const inputNode = container.querySelector('input')
  expect(inputNode.id).toEqual('downshift-0-input')

  Simulate.change(inputNode, { target: { value: 'Company 0' } })
  expect(getByTestId('company-name')).toHaveTextContent('Company 0')

  Simulate.change(inputNode, { target: { value: 'company' } })
  expect(getByText('Company 0')).toBeTruthy()
  expect(getByText('Company 1')).toBeTruthy()
  expect(getByText('Company 2')).toBeTruthy()

  fireEvent.click(getByText('Company 0'))
  expect(inputNode.value).toEqual('Company 0')
  expect(container.firstChild).toMatchSnapshot()

  // Re-render the components without the query
  // in order to cause a GraphQL error
  rerender(
    <MemoryRouter>
      <MockedProvider mocks={[]} addTypename={false}>
        <Search />
      </MockedProvider>
    </MemoryRouter>
  )

  await wait(200)

  expect(getByTestId('graphql-error')).toBeTruthy()
})
