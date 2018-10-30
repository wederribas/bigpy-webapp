import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import MoodBad from '@material-ui/icons/MoodBad'
import BouncingLoader from '../BouncingLoader/BouncingLoader'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 30
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 250
  }
})

export const dashboardQuery = gql`
  query DashboardSearchQuery($companyName: String!, $next: String) {
    allCustomerReports(after: $next, first: 10, companyName: $companyName) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          Id
          companyName
          userReport
          userRating
          userFeedback
        }
      }
    }
    companyReportsCount(Id: $companyName) {
      edges {
        node {
          count
        }
      }
    }
  }
`

class Dashboard extends Component {
  state = {}
  render() {
    const { classes } = this.props
    const companyName = this.props.match.params.companyName
    return (
      <Query query={dashboardQuery} variables={{ companyName: companyName }}>
        {({ loading, error, data, refetch }) => {
          if (loading)
            return (
              <div className={classes.loader}>
                <BouncingLoader className={classes.loader} />
              </div>
            )
          if (error)
            return (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <MoodBad className={classes.icon} color="disabled" />
                <Typography
                  data-testid="graphql-error"
                  variant="h5"
                  color="inherit"
                >
                  Something went bad. Please, try again.
                </Typography>
              </Grid>
            )

          const paginationCursor = data.allCustomerReports.pageInfo.endCursor
          const dataToRender = data.allCustomerReports.edges
          const totalReports = data.companyReportsCount.edges[0].node.count

          return (
            <div>
              <Paper className={classes.root} elevation={1}>
                <Typography
                  data-testid="company-name"
                  variant="h4"
                  component="h2"
                >
                  {companyName}
                </Typography>
                <Typography data-testid="reports-count" component="p">
                  {totalReports}
                </Typography>
              </Paper>

              {dataToRender.map(report => (
                <div key={report.node.Id}>
                  <p>{report.node.companyName}</p>
                  <p>{report.node.userReport}</p>
                  <p>{report.node.userRating}</p>
                  <p>{report.node.userFeedback}</p>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => refetch({ paginationCursor: paginationCursor })}
              >
                Load More
              </Button>
            </div>
          )
        }}
      </Query>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
