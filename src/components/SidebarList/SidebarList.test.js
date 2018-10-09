import React from 'react'
import { render } from 'react-testing-library'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SidebarList from './SidebarList'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

test('Sidebar list', () => {
  const sidebar = render(
    <MuiThemeProvider theme={theme}>
      <SidebarList />
    </MuiThemeProvider>
  )
  const { getByText } = sidebar

  expect(getByText('Search')).toHaveTextContent('Search')
  expect(getByText('Top 10')).toHaveTextContent('Top 10')
  expect(getByText('Insights')).toHaveTextContent('Insights')
  expect(getByText('About')).toHaveTextContent('About')
})
