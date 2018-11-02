import React from 'react'
import { render } from '../../utils/test-utils'
import ErrorMessage from './ErrorMessage'

test('<ErrorMessage /> component renders', () => {
  const { container, getByTestId } = render(<ErrorMessage />)

  expect(container.firstChild).toMatchSnapshot()
  expect(getByTestId('graphql-error')).toBeTruthy()
})
