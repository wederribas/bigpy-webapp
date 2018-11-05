import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Button,
  Paper,
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid
} from '@material-ui/core'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import BouncingLoader from '../BouncingLoader/BouncingLoader'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  feed: {
    marginTop: theme.spacing.unit * 2
  },
  feedListItem: {
    display: 'block'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 10
  },
  loadButton: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export const USER_REPORT_FEED_QUERY = gql`
  query UserReportFeedQuery($companyName: String!, $cursor: String) {
    allCustomerReports(after: $cursor, first: 5, companyName: $companyName) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          Id
          companyName
          city
          state
          userReport
          userRating
          userFeedback
          date
        }
      }
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

function LoadMoreButton(props) {
  const { classes } = props
  return (
    <div className={classes.loadButton}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.loadMore()}
      >
        Load More
      </Button>
    </div>
  )
}

LoadMoreButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired
}

function ReportsFeed(props) {
  const { classes } = props
  const totalReports = props.reports.length
  return (
    <Grid>
      <Paper elevation={1} className={`${classes.root} ${props.classes.feed}`}>
        <Typography variant="h4" component="h2">
          Users Reports
        </Typography>
        <List data-testid="reports-list">
          {props.reports.map((report, index) => {
            const date = new Date(report.node.date)
            return (
              <div key={report.node.Id}>
                <ListItem className={classes.feedListItem}>
                  <ListItemText
                    primary={`${report.node.city} - ${report.node.state}`}
                    secondary={date.toDateString()}
                  />
                  <Typography component="p">
                    {report.node.userReport}
                  </Typography>
                  <Typography component="p">
                    {report.node.userFeedback}
                  </Typography>
                  <Typography component="p">
                    {report.node.userRating}
                  </Typography>
                </ListItem>
                {totalReports === index + 1 || <Divider />}
              </div>
            )
          })}
        </List>
        {props.isLoadingMore ? (
          <BouncingLoader />
        ) : (
          <LoadMoreButton loadMore={props.loadMore} classes={props.classes} />
        )}
      </Paper>
    </Grid>
  )
}

ReportsFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  reports: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool.isRequired
}

class UserReportFeed extends Component {
  state = {
    isLoadingMore: false
  }

  render() {
    return (
      <Query
        query={USER_REPORT_FEED_QUERY}
        variables={{ companyName: this.props.companyName }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <Loading classes={this.props.classes} />
          if (error) return <ErrorMessage />

          const paginationCursor = data.allCustomerReports.pageInfo.endCursor
          const reports = data.allCustomerReports.edges

          const loadMore = () => {
            this.setState({ isLoadingMore: true })
            return fetchMore({
              variables: {
                cursor: paginationCursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.allCustomerReports.edges
                const pageInfo = fetchMoreResult.allCustomerReports.pageInfo

                this.setState({ isLoadingMore: false })

                return newEdges.length
                  ? {
                      allCustomerReports: {
                        __typename:
                          previousResult.allCustomerReports.__typename,
                        edges: [
                          ...previousResult.allCustomerReports.edges,
                          ...newEdges
                        ],
                        pageInfo
                      }
                    }
                  : previousResult
              }
            })
          }

          return (
            <div data-testid="feed">
              <ReportsFeed
                reports={reports}
                classes={this.props.classes}
                loadMore={loadMore}
                isLoadingMore={this.state.isLoadingMore}
              />
            </div>
          )
        }}
      </Query>
    )
  }
}

UserReportFeed.propTypes = {
  companyName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserReportFeed)
