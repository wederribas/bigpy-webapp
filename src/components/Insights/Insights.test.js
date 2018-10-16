import React from 'react'
import { render } from '../../utils/test-utils'
import Insights from './Insights'

test('Insights page testing', () => {
  const { container, getByText } = render(<Insights />)

  expect(container.firstChild).toMatchSnapshot()
  expect(getByText('Insights')).toHaveTextContent('Insights')
})
