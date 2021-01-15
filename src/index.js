import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Product from './Product';
import Location from './Location';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Navbar,Nav } from 'react-bootstrap'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/">Warehouse Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/location">Location</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Switch>
        <Route exact path="/product">
          { <Product /> }
        </Route>
        <Route path="/location">
          { <Location /> }
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
