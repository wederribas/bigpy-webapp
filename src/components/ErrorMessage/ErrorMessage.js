import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, withStyles } from '@material-ui/core'
import MoodBad from '@material-ui/icons/MoodBad'

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 250
  }
})

function ErrorMessage(props) {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <MoodBad className={props.classes.icon} color="disabled" />
      <Typography data-testid="graphql-error" variant="h5" color="inherit">
        Something went bad. Please, try again.
      </Typography>
    </Grid>
  )
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ErrorMessage)
