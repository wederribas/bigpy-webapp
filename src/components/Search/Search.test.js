import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { fireEvent } from 'react-testing-library'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from '../../utils/test-utils'
import { mocks } from '../../utils/graphql-test-mocks'
import Search from './Search'

test('Search bar filtering', async () => {
  const { container, getByTestId, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Search />
    </MockedProvider>
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
})
