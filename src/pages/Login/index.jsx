import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions';

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    }

    handleSubmit = () => {
        this.props.loginRequest(this.state);
    }

    render() {
        const { error, isLoading, user } = this.props;
        if(user && user.name){
            return (<Redirect to="/search" from="/" />)
        }

        return (
            <div className="container" style={{ paddingTop: '25vh' }}>
                <div className="center">
                    <h2>Login</h2>
                </div>
                <div className="form-group">
                    <label >Username:</label>
                    <input type="text" className="form-control" id="usr" onChange={(e) => this.handleChange('username', e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={(e) => this.handleChange('password', e.target.value)} />
                </div>
                <button disabled={isLoading} type="button" className="btn btn-primary" onClick={this.handleSubmit}>{isLoading ? 'Loading..' : 'Login'}</button>
                {error && (<div>
                    {error}
                </div>)}
            </div>
        )
    }
};

const mapStateToProps = ({ login }) => ({
    user: login.user,
    isLoading: login.isLoading,
    error: login.error
});

const mapDispatchToProps = dispatch => ({
    loginRequest: (data) => dispatch(loginRequest(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
