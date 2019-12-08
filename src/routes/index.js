import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../pages/Login';
import SearchPlanet from '../pages/SearchPlanet';
import Navbar from '../layouts/navbar';

import configureStore from '../store';

const store = configureStore();

const PrivateRoute = (props) => {
    if (sessionStorage.getItem('user')) {
        return (
            <React.Fragment>
                <Navbar />
                <Route {...props} />
            </React.Fragment>)
    } else
        return (
            <Redirect to="/" />
        )
}

const PublicRoute = (props) => {
    if (!sessionStorage.getItem('user')) {
        return <Route {...props} />
    } else
        return (
            <Redirect to="/search" />
        )
}

const Routes = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <PublicRoute exact path="/" component={Login} />
                    <PrivateRoute exact path="/search" component={SearchPlanet} />
                </Switch>
            </Router>
        </Provider>
    )
}

export default Routes;