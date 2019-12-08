import { LOGIN, USER, SEARCH } from '../constants';

const loginRequest = formData => ({
    type: LOGIN.LOGIN_REQUEST,
    formData
});

const logout = () => ({
    type: USER.LOGOUT
});

const setUser = user => ({
    type: LOGIN.LOGIN_SUCCESS,
    user,
});

const setLoginError = error => ({
    type: LOGIN.LOGIN_FAIL,
    error,
});

const searchRequest = planet => ({
    type: SEARCH.SEARCH_REQUEST,
    planet
});

const searchSuccess = result => ({
    type: SEARCH.SEARCH_SUCCESS,
    result
})

const searchFail = error => ({
    type: SEARCH.SEARCH_FAIL,
    error
})

export {
    loginRequest,
    setUser,
    setLoginError,
    logout,
    searchRequest,
    searchSuccess,
    searchFail
};
