//Dependencies
import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loader from 'react-loader-spinner';

//Components
import LaunchItem from './LaunchItem';

//Query
const LAUNCHES_QUERY = gql`
  query LaunchesQuery($offset: Int, $limit: Int!) {
    launches (offset: $offset, limit: $limit){
      flight_number
      mission_name
      launch_date_local
      launch_success
      details
      links {
        mission_patch
      }
      rocket{
        rocket_name
      }
      launch_site {
        site_name
      }
    }
  }
`;

const ITEMS_PER_PAGE = 6;

class Launches extends Component {

  render() {
    return (
      <Query query={LAUNCHES_QUERY} variables={{ offset: 0, limit: ITEMS_PER_PAGE}} fetchPolicy="cache-and-network">
        {({ loading, error, data, fetchMore }) => {
          if(error) console.log(error);

          return ( 
            <Fragment>
              <LaunchItem
                entries={data.launches || []}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.launches.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        launches: [...prev.launches, ...fetchMoreResult.launches]
                      });
                    }
                  })
                }
              />
              {loading && 
                <div style={{textAlign: 'center'}}>
                  <Loader type="ThreeDots"
                    color="rgba(240, 239, 226, 1)"
                    height="100"	
                    width="100" 
                  />
                </div>
              }
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Launches;