import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import MainComponent from '../MainComponent/MainComponent'
import './App.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <MainComponent />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
