import React from 'react'
import { render } from '../../utils/test-utils'
import SidebarList from './SidebarList'

test('Sidebar list', () => {
  const { getByText } = render(<SidebarList />)

  expect(getByText('Search')).toHaveTextContent('Search')
  expect(getByText('Top 10')).toHaveTextContent('Top 10')
  expect(getByText('Insights')).toHaveTextContent('Insights')
  expect(getByText('About')).toHaveTextContent('About')
})
