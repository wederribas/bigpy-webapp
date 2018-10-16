import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'

import BouncingLoader from './BouncingLoader'

test('Renders the animated loading dots and check if there are 3 dots', () => {
  const { container } = render(<BouncingLoader />)
  const renderedDotsCount = container.querySelector('div').children.length

  expect(container.firstChild).toMatchSnapshot()
  expect(renderedDotsCount).toEqual(3)
})
