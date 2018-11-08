import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, withStyles } from '@material-ui/core'
import ChartWrapper from '../ChartWrapper/ChartWrapper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
})

function CompanyCharts(props) {
  const { classes, data } = props

  const years = data.map(entry => entry.year).sort()

  const countPerYear = years.map(year => {
    let foundMatch
    data.forEach(entry => {
      if (entry.year === year) {
        foundMatch = entry.count
      }
    })

    return foundMatch
  })

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Customer reports per year',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        pointHoverBackgroundColor: 'rgba(255,99,132,0.4)',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: countPerYear
      }
    ]
  }

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container spacing={24}>
        <Grid item lg={6} md={12} xs={12}>
          <ChartWrapper data={chartData} type="line" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <ChartWrapper data={chartData} type="line" />
          <ChartWrapper data={chartData} type="line" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <ChartWrapper data={chartData} type="line" />
          <ChartWrapper data={chartData} type="line" />
        </Grid>
      </Grid>
    </Paper>
  )
}

CompanyCharts.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

export default withStyles(styles)(CompanyCharts)
