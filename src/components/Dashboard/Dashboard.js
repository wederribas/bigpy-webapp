import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Paper, Typography, withStyles } from '@material-ui/core'
import UserReportFeed from '../UserReportFeed/UserReportFeed'
import BouncingLoader from '../BouncingLoader/BouncingLoader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

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
  }
})

export const DASHBOARD_QUERY = gql`
  query UsersReportsQuery($companyName: String!) {
    totalCompanyReports(companyName: $companyName)
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
  return (
    <Paper className={props.classes.root} elevation={1}>
      <Typography data-testid="company-name" variant="h4" component="h2">
        {props.company.name}
      </Typography>
      <Typography data-testid="reports-count" component="p">
        {props.company.reportsCount}
      </Typography>
    </Paper>
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

            return (
              <div>
                <CompanyInformationBar
                  classes={classes}
                  company={{
                    name: companyName,
                    reportsCount: data.totalCompanyReports
                  }}
                />
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
