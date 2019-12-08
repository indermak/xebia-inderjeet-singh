import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

const Navbar = ({ history, logout }) => {
    return (

        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand" >Xebia</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><span className="glyphicon glyphicon-user"></span> {sessionStorage.getItem('user')}</li>
                    <li><button type="link" onClick={() => logoutUser(history, logout)}><span className="glyphicon glyphicon-log-out"></span> Logout</button></li>
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = ({ login }) => ({
    user: login.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

const RouterNavbar = withRouter(Navbar);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouterNavbar);

const logoutUser = (history, logout) => {
    sessionStorage.clear();
    logout();
    history.push('/')
}
