import React from 'react'
import { render } from 'react-testing-library'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navigation from './Navigation'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

test('Navigation bars', () => {
  const nav = render(
    <MuiThemeProvider theme={theme}>
      <Navigation />
    </MuiThemeProvider>
  )
  const { getByText } = nav

  expect(getByText('Search')).toHaveTextContent('Search')
  expect(getByText('Top 10')).toHaveTextContent('Top 10')
  expect(getByText('Insights')).toHaveTextContent('Insights')
})
