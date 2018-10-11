import React from 'react'
import { render } from 'react-testing-library'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const customRender = node => {
  return render(<MuiThemeProvider theme={theme}>{node}</MuiThemeProvider>)
}

export * from 'react-testing-library'

export { customRender as render }
