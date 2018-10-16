import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navigation from '../Navigation/Navigation'
import { routes } from '../../utils/routes'

const styles = theme => ({
  root: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    overflow: 'auto'
  },
  toolbar: theme.mixins.toolbar
})

function MainComponent(props) {
  const { classes } = props
  return (
    <Router>
      <div className={classes.root}>
        <Navigation />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {routes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            )
          })}
        </main>
      </div>
    </Router>
  )
}

MainComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainComponent)
