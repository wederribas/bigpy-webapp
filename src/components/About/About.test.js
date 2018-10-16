import React from 'react'
import { render } from '../../utils/test-utils'
import About from './About'

test('About page testing', () => {
  const { container, getByText } = render(<About />)

  expect(container.firstChild).toMatchSnapshot()
  expect(getByText('About')).toHaveTextContent('About')
})
