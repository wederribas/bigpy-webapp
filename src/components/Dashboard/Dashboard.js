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
  query DashboardSearchQuery($companyName: String!) {
    allCompanyReports(companyName: $companyName) {
      countFiltered
    }
  }
`

export const usersReportsQuery = gql`
  query UsersReportsQuery($companyName: String!, $cursor: String) {
    allCustomerReports(after: $cursor, first: 10, companyName: $companyName) {
      pageInfo {
        endCursor
        hasNextPage
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
  }
`

class Dashboard extends Component {
  state = {}
  render() {
    const { classes } = this.props
    const companyName = this.props.match.params.companyName
    return (
      <div>
        <Query query={dashboardQuery} variables={{ companyName: companyName }}>
          {({
            loading: loadingDashboard,
            error: dashboarError,
            data: { allCompanyReports }
          }) => (
            <Query
              query={usersReportsQuery}
              variables={{ companyName: companyName }}
            >
              {({
                loading: loadingReports,
                error: reportsError,
                data: { allCustomerReports },
                fetchMore
              }) => {
                if (loadingDashboard || loadingReports)
                  return (
                    <div className={classes.loader}>
                      <BouncingLoader className={classes.loader} />
                    </div>
                  )
                if (dashboarError || reportsError)
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

                const paginationCursor = allCustomerReports.pageInfo.endCursor
                const dataToRender = allCustomerReports.edges
                const totalReports = allCompanyReports.countFiltered

                return (
                  <div>
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
                    </div>

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
                      onClick={() =>
                        fetchMore({
                          variables: {
                            cursor: paginationCursor
                          },
                          updateQuery: (
                            previousResult,
                            { fetchMoreResult }
                          ) => {
                            const newEdges =
                              fetchMoreResult.allCustomerReports.edges
                            const pageInfo =
                              fetchMoreResult.allCustomerReports.pageInfo

                            return newEdges.length
                              ? {
                                  allCustomerReports: {
                                    __typename:
                                      previousResult.allCustomerReports
                                        .__typename,
                                    edges: [
                                      ...previousResult.allCustomerReports
                                        .edges,
                                      ...newEdges
                                    ],
                                    pageInfo
                                  }
                                }
                              : previousResult
                          }
                        })
                      }
                    >
                      Load More
                    </Button>
                  </div>
                )
              }}
            </Query>
          )}
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
