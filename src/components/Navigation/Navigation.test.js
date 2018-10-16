import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '../../utils/test-utils'
import Navigation from './Navigation'

test('Navigation bars', () => {
  const nav = render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  )
  const { getByText } = nav

  expect(getByText('Search')).toHaveTextContent('Search')
  expect(getByText('Top 10')).toHaveTextContent('Top 10')
  expect(getByText('Insights')).toHaveTextContent('Insights')
})
