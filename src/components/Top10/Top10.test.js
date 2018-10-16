import React from 'react'
import { render } from '../../utils/test-utils'
import Top10 from './Top10'

test('Top10 page testing', () => {
  const { container, getByText } = render(<Top10 />)

  expect(container.firstChild).toMatchSnapshot()
  expect(getByText('Top 10')).toHaveTextContent('Top 10')
})
