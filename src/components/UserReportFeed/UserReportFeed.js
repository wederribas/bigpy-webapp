import React from 'react'
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
  Divider
} from '@material-ui/core'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

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

function LoadMoreButton(props) {
  const { classes } = props
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={() => props.loadMore()}
    >
      Load More
    </Button>
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
                <Typography component="p">{report.node.userReport}</Typography>
                <Typography component="p">
                  {report.node.userFeedback}
                </Typography>
                <Typography component="p">{report.node.userRating}</Typography>
              </ListItem>
              {totalReports === index + 1 || <Divider />}
            </div>
          )
        })}
      </List>
      <LoadMoreButton loadMore={props.loadMore} classes={props.classes} />
    </Paper>
  )
}

ReportsFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  reports: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired
}

function UserReportFeed(props) {
  return (
    <Query
      query={USER_REPORT_FEED_QUERY}
      variables={{ companyName: props.companyName }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return null

        if (error) return <ErrorMessage />

        const paginationCursor = data.allCustomerReports.pageInfo.endCursor
        const reports = data.allCustomerReports.edges

        const loadMore = () =>
          fetchMore({
            variables: {
              cursor: paginationCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.allCustomerReports.edges
              const pageInfo = fetchMoreResult.allCustomerReports.pageInfo

              return newEdges.length
                ? {
                    allCustomerReports: {
                      __typename: previousResult.allCustomerReports.__typename,
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

        return (
          <div data-testid="feed">
            <ReportsFeed
              reports={reports}
              classes={props.classes}
              loadMore={loadMore}
            />
          </div>
        )
      }}
    </Query>
  )
}

UserReportFeed.propTypes = {
  companyName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserReportFeed)
