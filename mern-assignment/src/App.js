import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import UsersList from './Components/UsersListComponent';
import MyAccount from './Components/MyAccount';

function App() {
  //placing the account and user list sections within routes to access them directly from nav
  return (
    <Router>
      <nav>
        <div className="nav-wrapper center indigo lighten-1">
          <Link className="brand-logo" to="/"> MyFriends </Link>
          <ul id="nav-mobile">
            <li>
              <Link to="/">View Friends</Link>
            </li>
            <li>
              <Link to="/add">My Account</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Route path="/" exact component={UsersList}/>
      <Route path="/add" exact component={MyAccount}/>
    </Router>
  );
}

export default App;
