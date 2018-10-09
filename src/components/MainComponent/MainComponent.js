import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Navigation from '../Navigation/Navigation'

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
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
})

function MainComponent(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>{'#TODO'}</Typography>
      </main>
    </div>
  )
}

MainComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainComponent)
