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

function CustomerReportsPerYearChart(props) {
  const { data } = props

  const years = data.map(entry => entry.year)
  const countPerYear = data.map(entry => entry.count)

  const chartData = {
    labels: years,
    datasets: [
      {
        backgroundColor: 'rgba(213,108,104,0.2)',
        borderColor: 'rgba(213,108,104,1)',
        borderWidth: 1,
        pointHoverBackgroundColor: 'rgba(213,108,104,0.4)',
        pointHoverBorderColor: 'rgba(213,108,104,1)',
        data: countPerYear
      }
    ]
  }

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Reports per Year'
    }
  }

  return <ChartWrapper data={chartData} options={options} type="line" />
}

CustomerReportsPerYearChart.propTypes = {
  data: PropTypes.array.isRequired
}

function CustomerReportsPerRegionChart(props) {
  const { data } = props

  const regions = data.map(entry => entry.region)
  const countPerRegion = data.map(entry => entry.count)

  const chartData = {
    datasets: [
      {
        data: countPerRegion,
        backgroundColor: [
          'rgba(93,172,163)',
          'rgba(100,190,121)',
          'rgba(238,203,116)',
          'rgba(203,64,57)',
          'rgba(70,131,195)'
        ],
        label: 'Dataset 1'
      }
    ],
    labels: regions
  }

  const options = {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Reports per Region'
    }
  }

  return <ChartWrapper data={chartData} options={options} type="doughnut" />
}

CustomerReportsPerRegionChart.propTypes = {
  data: PropTypes.array.isRequired
}

function CustomerReportsRatingPerYearChart(props) {
  const { data } = props

  const years = data.map(entry => entry.year)
  const averagePerYear = data.map(entry => Number(entry.average).toFixed(2))

  const chartData = {
    labels: years,
    datasets: [
      {
        borderColor: 'rgba(70,131,195)',
        borderWidth: 2,
        pointHoverBackgroundColor: 'rgba(70,131,195,0.4)',
        pointHoverBorderColor: 'rgba(70,131,195,1)',
        data: averagePerYear,
        fill: false
      }
    ]
  }

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Rating per Year'
    }
  }

  return <ChartWrapper data={chartData} options={options} type="line" />
}

CustomerReportsRatingPerYearChart.propTypes = {
  data: PropTypes.array.isRequired
}

function CustomerReportPerGenderChart(props) {
  const { data } = props

  const years = ['Female', 'Male']
  const genderCount = data.map(entry => entry.count)

  const chartData = {
    labels: years,
    datasets: [
      {
        backgroundColor: ['rgba(93,172,163,0.2)', 'rgba(100,190,121,0.2)'],
        borderColor: ['rgba(93,172,163,1)', 'rgba(100,190,121,1)'],
        borderWidth: 1,
        pointHoverBackgroundColor: 'rgba(213,108,104,0.4)',
        pointHoverBorderColor: 'rgba(213,108,104,1)',
        data: genderCount
      }
    ]
  }

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Reports per Gender'
    }
  }

  return <ChartWrapper data={chartData} options={options} type="bar" />
}

CustomerReportPerGenderChart.propTypes = {
  data: PropTypes.array.isRequired
}

function CustomerReportPerAgeChart(props) {
  const { data } = props

  const years = data.map(entry => entry.ageRange)
  const ageRangeCount = data.map(entry => entry.count)

  const chartData = {
    labels: years,
    datasets: [
      {
        data: ageRangeCount,
        backgroundColor: [
          'rgba(93,172,163)',
          'rgba(100,190,121)',
          'rgba(238,203,116)',
          'rgba(203,64,57)',
          'rgba(70,131,195)',
          'rgba(23,40,56)',
          'rgba(50,99,94)'
        ],
        label: 'Dataset 1'
      }
    ]
  }

  const options = {
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Reports per Age Range'
    }
  }

  return <ChartWrapper data={chartData} options={options} type="polarArea" />
}

CustomerReportPerAgeChart.propTypes = {
  data: PropTypes.array.isRequired
}

function CompanyCharts(props) {
  const {
    classes,
    data: {
      reportsPerDate,
      companyReportsPerRegion,
      companyRatingPerYear,
      companyReportsPerGender,
      companyReportsPerAge
    }
  } = props

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container spacing={24}>
        <Grid item lg={6} md={12} xs={12}>
          <CustomerReportsPerYearChart data={reportsPerDate} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <CustomerReportsRatingPerYearChart data={companyRatingPerYear} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <CustomerReportPerGenderChart data={companyReportsPerGender} />
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <CustomerReportsPerRegionChart data={companyReportsPerRegion} />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <CustomerReportPerAgeChart data={companyReportsPerAge} />
        </Grid>
      </Grid>
    </Paper>
  )
}

CompanyCharts.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyCharts)
