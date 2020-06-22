import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/home" className="navbar-brand">
              Lyrics Game
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/newgame"} className="nav-link">
                  New Game
                </Link>
              </li>
            </div>
          </nav>
        </div>
      </Router>
    )
  };
}
export default App;
