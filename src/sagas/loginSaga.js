import { put, call, takeEvery, select } from 'redux-saga/effects';
import { setUser, setLoginError } from '../actions';
import { LOGIN } from '../constants';
import { fetchUser } from '../api';

export const getUsername = state => state.login.formData.username;
export const getPassword = state => state.login.formData.password;

export function* handleLogin() {
    try {
        const username = yield select(getUsername);
        const password = yield select(getPassword);
        let error = '';
        if (!username) {
            error = 'Please enter username!';
        }
        if (!password) {
            error = 'Please enter password!';
        }
        if (error) {
            yield put(setLoginError(error));
            return;
        }
        const retVal = yield call(fetchUser, username);
        if (retVal && retVal.results && retVal.results.length) {
            const user = retVal.results[0];
            if (username === user.name && user.birth_year === password) {
                sessionStorage.setItem('user', username);
                yield put(setUser(user));
            } else {
                yield put(setLoginError('Incorrect Username or Password!'));
            }
        } else {
            yield put(setLoginError('Unable to find user with username!'));
        }

    } catch (error) {
        yield put(setLoginError(error.toString()));
    }
}

export default function* watchLogin() {
    yield takeEvery(LOGIN.LOGIN_REQUEST, handleLogin);
}
