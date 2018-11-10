import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Paper, Typography, withStyles, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import UserReportFeed from '../UserReportFeed/UserReportFeed'
import BouncingLoader from '../BouncingLoader/BouncingLoader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import CompanyCharts from '../CompanyCharts/CompanyCharts'

const styles = theme => ({
  card: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 30
  }
})

export const DASHBOARD_QUERY = gql`
  query UsersReportsQuery($companyName: String!) {
    totalCompanyReports(companyName: $companyName)
    totalCompanyReplies(companyName: $companyName)
    overallCompanyRating(companyName: $companyName)
    allCompanyReports(first: 1, companyName: $companyName) {
      edges {
        node {
          marketSegment
        }
      }
    }
    reportsPerDate(companyName: $companyName) {
      year
      count
    }
    companyReportsPerRegion(companyName: $companyName) {
      region
      count
    }
    companyRatingPerYear(companyName: $companyName) {
      year
      average
    }
    companyReportsPerGender(companyName: $companyName) {
      gender
      count
    }
    companyReportsPerAge(companyName: $companyName) {
      ageRange
      count
    }
  }
`

function Loading(props) {
  return (
    <div className={props.classes.loader}>
      <BouncingLoader />
    </div>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

function CompanyInformationBar(props) {
  const { reportsReplied, reportsCount } = props.company
  const responseRate = ((reportsReplied / reportsCount) * 100).toFixed(2)
  return (
    <Grid container spacing={24}>
      <Grid item lg={6} md={6} xs={12}>
        <Paper className={props.classes.card} elevation={1}>
          <Typography data-testid="company-name" variant="h4" component="h2">
            {props.company.name}
          </Typography>
          <Typography data-testid="company-market-segment" component="p">
            {props.company.marketSegment}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={props.classes.card} elevation={1}>
          <CountUp
            start={0}
            end={props.company.overallRating}
            duration={2}
            separator=" "
            decimals={1.75}
            decimal={'.'}
            delay={0}
          >
            {({ countUpRef }) => (
              <Typography
                data-testid="company-overall-rating"
                variant="h4"
                component="h2"
              >
                <span ref={countUpRef} />
              </Typography>
            )}
          </CountUp>
          <Typography component="p">Overall rating</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={props.classes.card} elevation={1}>
          <CountUp
            start={0}
            end={Number(responseRate)}
            duration={1.5}
            separator=" "
            decimals={2}
            decimal={'.'}
            suffix={'%'}
            delay={0}
          >
            {({ countUpRef }) => (
              <Typography
                data-testid="company-response-rate"
                variant="h4"
                component="h2"
              >
                <span ref={countUpRef} />
              </Typography>
            )}
          </CountUp>
          <Typography component="p">Response rate</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

CompanyInformationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
}

class Dashboard extends Component {
  state = {}
  render() {
    const { classes } = this.props
    const companyName = this.props.match.params.companyName
    return (
      <div>
        <Query query={DASHBOARD_QUERY} variables={{ companyName: companyName }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading classes={classes} />
            if (error) return <ErrorMessage />

            const chartsData = {
              reportsPerDate: data.reportsPerDate,
              companyReportsPerRegion: data.companyReportsPerRegion,
              companyRatingPerYear: data.companyRatingPerYear,
              companyReportsPerGender: data.companyReportsPerGender,
              companyReportsPerAge: data.companyReportsPerAge
            }

            return (
              <div>
                <CompanyInformationBar
                  classes={classes}
                  company={{
                    name: companyName,
                    marketSegment:
                      data.allCompanyReports.edges[0].node.marketSegment,
                    reportsCount: data.totalCompanyReports,
                    reportsReplied: data.totalCompanyReplies,
                    overallRating: data.overallCompanyRating
                  }}
                />
                <CompanyCharts data={chartsData} />
                <UserReportFeed companyName={companyName} />
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
