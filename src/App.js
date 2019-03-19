//DEpendencies
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Styles
import './App.css';

//Components
import Nav from './components/Nav';
import HeroBg from './components/HeroBg';
import Launches from './components/Launches/Launches';
import Rockets from './components/Rockets/Rockets';
import Rocket from './components/Rockets/Rocket';

const client = new ApolloClient({
  uri: '/graphql'
})

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="app">
            <Nav />
            <div className="hero">
              <Route exact path="/" component={HeroBg} />
              <Route exact path="/launches" component={Launches} />
              <Route exact path="/rockets" component={Rockets} />
              <Route exact path="/rockets/:rocket_id" component={Rocket} />
            </div>
          </div>

        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
