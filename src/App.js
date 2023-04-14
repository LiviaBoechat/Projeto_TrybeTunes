import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Header from './Header';
import Album from './pages/Album';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/search" component={ Search } />
        <Route path="/header" component={ Header } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
