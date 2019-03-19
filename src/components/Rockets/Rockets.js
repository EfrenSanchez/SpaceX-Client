//Dependencies
import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

//Styles
import './rockets.css';

//Query
const ROCKETS_QUERY = gql`
  query RocketsQuery {
    rockets {
      rocket_id
      rocket_name
      active
      first_flight
    }
  }
`;

class Rockets extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      redirect: false,
      param: ''
    };

    this.clickTableHandle = this.clickTableHandle.bind(this);
  }

  clickTableHandle = (param) => {
    this.setState({ redirect: true, param});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/rockets/${this.state.param}`}/>;
    }

    return (
      <Query query={ROCKETS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return (
            <div style={{textAlign: 'center'}}>
              <Loader type="ThreeDots"
                color="rgba(240, 239, 226, 1)"
                height="100"	
                width="100" 
              />
            </div>
          );
          if (error) console.log(error);

          return ( 
            <Fragment>
              <table className="rockets-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Active</th>
                    <th>First Flight</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rockets.map(rocket => (
                    <tr key={rocket.rocket_id} > 
                        
                        <td onClick={() => this.clickTableHandle(rocket.rocket_id)}>
                          {rocket.rocket_name}
                        </td>
                        
                        <td onClick={() => this.clickTableHandle(rocket.rocket_id)}>
                          {rocket.active ? `Yes` : `Not`}
                        </td>
                        <td onClick={() => this.clickTableHandle(rocket.rocket_id)}>
                          {rocket.first_flight}
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Rockets;