//Dependencies
import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';

//images
import { Img, Video} from '../../assets/rocket-media';

//Styles
import "./rocket.css";

//Query
const ROCKET_QUERY = gql`
  query RocketQuery($rocket_id: String!) {
    rocket(rocket_id: $rocket_id) {
      rocket_id
      rocket_name
      description
      active
      first_flight
      wikipedia
      height {
        feet
        meters
      }
      diameter {
        feet
        meters
      }
      mass {
        kg
        lb
      }
      engines {
        number
        version
        propellant_1
        propellant_2
        type
      }
    }
  }
`;

export class Rocket extends Component {
  render() {
    let { rocket_id } = this.props.match.params;
    const vieoOpts = {
      playerVars: { 
        autoplay: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        disablekb: 1,
        controls: 2
      }
    }

    return (
      <Fragment>
        <Query query={ROCKET_QUERY} variables={{ rocket_id }}>
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

            const {
              rocket_id,
              rocket_name,
              description,
              first_flight,
              wikipedia,
              height,
              diameter,
              mass,
              engines
            } = data.rocket;

            return (
              <div>
                <Link to="/rockets" className="rocket-btnBack">
                  &#60; Back to Rockets
                </Link>
                <div 
                  className = {
                    rocket_id === 'bfr'
                      ? "rocket-container bg-dark" 
                      : "rocket-container bg-light"
                  }
                >
                  <Img id={rocket_id} className="rocket-img" alt={rocket_name} />
                  <div className="rocket-header"> 
                    <h2 className="rocket-title">{rocket_name}</h2>
                    <span className="rocket-divider__md">{' '}</span>
                  </div>
                  <h4 className="rocket-first_flight">First flight: {first_flight}</h4>
                  <p className="rocket-description">{description}</p>
                    <div className="rocket-overview">
                      <h4 className="rocket-overview__title">
                        Technical overview
                      </h4>
                      <div className="rocket-overview__details">
                        <div>
                          <div className="rocket-overview__height">
                            <h4>Height</h4>
                            <span className="rocket-divider__md">{' '}</span>
                            <p className="rocket-overview__parph">
                              {height.meters} m. <span>{height.feet} ft.</span>
                            </p>
                          </div>
                          <div className="rocket-overview__engines">
                            <h4>Engines</h4>
                            <span className="rocket-divider__md">{' '}</span>
                            <ul className="rocket-overview__list" >
                              <li>Number: <span>{engines.number}</span></li>
                              <li>Type: <span>{engines.type}</span></li>
                              <li>Version: <span>{engines.version}</span></li>
                              <li>Propellant 1: <span>{engines.propellant_1}</span></li>
                              <li>Propellant 2: <span>{engines.propellant_2}</span></li>
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div className="rocket-overview__diameter">
                            <h4>Diameter</h4>
                            <span className="rocket-divider__md">{' '}</span>
                            <p className="rocket-overview__parph">
                              {diameter.meters} m.<span>{diameter.feet} ft.</span>
                            </p>
                          </div>

                          <div className="rocket-overview__mass">
                            <h4>Mass</h4>
                            <span className="rocket-divider__md">{' '}</span>
                            <p className="rocket-overview__parph"> 
                              {mass.kg} kg. <span>{mass.lb} lb.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rocket-media">
                      <Video id={rocket_id} opts={vieoOpts} />
                      <div className="rocket-wiki">
                        <a
                          href={wikipedia}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          More information
                        </a>
                      </div>
                    </div>
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Rocket;
