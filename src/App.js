/** @format */

import React, { useEffect } from 'react';
import Navbar from './molecules/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import config from './config/config';
import { Container } from 'react-bootstrap';
import './App.css';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Security {...config}>
          <ToastContainer newestOnTop autoClose={2000} />
          <Navbar />
          <Container style={{ marginTop: '7rem' }}>
            <Route path="/implicit/callback" component={LoginCallback} />
            <Route component={Routes} />
          </Container>
        </Security>
      </Router>
    </Provider>
  );
};

export default App;
