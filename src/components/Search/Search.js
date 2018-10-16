import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import BouncingLoader from '../BouncingLoader/BouncingLoader'

const FEED_QUERY = gql`
  {
    allCustomerReports(first: 10, companyName: "Uber") {
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

export default class Search extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <BouncingLoader />
          if (error) return <div>Error</div>

          const dataToRender = data.allCustomerReports.edges

          return (
            <div>
              {dataToRender.map(report => (
                <div key={report.node.Id}>
                  <p>{report.node.companyName}</p>
                  <p>{report.node.userReport}</p>
                  <p>{report.node.userRating}</p>
                  <p>{report.node.userFeedback}</p>
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}
