import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import NotFound from './pages/NotFound';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/search" component={ Search } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default Routes;
