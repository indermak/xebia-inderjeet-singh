import { runSaga } from 'redux-saga';
import 'jest-localstorage-mock';
import { getUsername, getPassword, handleLogin } from '../loginSaga';
import * as api from '../../api'; // we'll mock the fetchImages api
import { setUser, setLoginError } from '../../actions';

test('selector should return the desired username', () => {
    const username = 'Luke Skywalker';
    const state = { login: {
        formData: {
            username,
        }
    } };
    const res = getUsername(state);
    expect(res).toBe(username);
});

test('selector should return the desired password', () => {
    const password = 'AB123';
    const state = {
        login: {
            formData: {
                password
            }
        }
    };
    const res = getPassword(state);
    expect(res).toBe(password);
});

test('should load and handle user in case of success', async () => {
    const dispatchedActions = [];

    const mockedUser = {
        results : [
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.co/api/planets/1/",
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/6/",
                    "https://swapi.co/api/films/3/",
                    "https://swapi.co/api/films/1/",
                    "https://swapi.co/api/films/7/"
                ],
                "species": [
                    "https://swapi.co/api/species/1/"
                ],
                "vehicles": [
                    "https://swapi.co/api/vehicles/14/",
                    "https://swapi.co/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.co/api/starships/12/",
                    "https://swapi.co/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.co/api/people/1/"
            }
        ]
        
    };
    api.fetchUser = jest.fn(() => Promise.resolve(mockedUser));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: 'Luke Skywalker',
                    password: '19BBY'
                }
            } }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;

    expect(api.fetchUser.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setUser(mockedUser.results[0]));
});

test('should handle user errors in case of failure', async () => {
    const dispatchedActions = [];

    const error = 'API server is down';
    api.fetchUser = jest.fn(() => Promise.reject(error));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: 'Luke Skywalker',
                    password: '19BBY'
                }
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;

    expect(api.fetchUser.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setLoginError(error));
});

test('should load and handle incorrect password', async () => {
    const dispatchedActions = [];

    const mockedUser = {
        results: [
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.co/api/planets/1/",
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/6/",
                    "https://swapi.co/api/films/3/",
                    "https://swapi.co/api/films/1/",
                    "https://swapi.co/api/films/7/"
                ],
                "species": [
                    "https://swapi.co/api/species/1/"
                ],
                "vehicles": [
                    "https://swapi.co/api/vehicles/14/",
                    "https://swapi.co/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.co/api/starships/12/",
                    "https://swapi.co/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.co/api/people/1/"
            }
        ]

    };
    api.fetchUser = jest.fn(() => Promise.resolve(mockedUser));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: 'Luke Skywalker',
                    password: '19BB'
                }
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;

    expect(api.fetchUser.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setLoginError('Incorrect Username or Password!'));
});

test('should load and handle incorrect username', async () => {
    const dispatchedActions = [];

    const mockedUser = {
        results: []

    };
    api.fetchUser = jest.fn(() => Promise.resolve(mockedUser));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: 'Luke Skywalkerrr',
                    password: '19BB'
                }
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;
    
    expect(api.fetchUser.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setLoginError('Unable to find user with username!'));
});

test('should load and handle with no username', async () => {
    const dispatchedActions = [];

    const mockedUser = {
        results: []

    };
    api.fetchUser = jest.fn(() => Promise.resolve(mockedUser));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: '',
                    password: '19BB'
                }
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;

    expect(api.fetchUser.mock.calls.length).toBe(0);
    expect(dispatchedActions).toContainEqual(setLoginError('Please enter username!'));
});

test('should load and handle with no password', async () => {
    const dispatchedActions = [];

    const mockedUser = {
        results: []

    };
    api.fetchUser = jest.fn(() => Promise.resolve(mockedUser));

    const store = {
        getState: () => ({
            login: {
                formData: {
                    username: 'Luke Skywalker',
                    password: ''
                }
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleLogin).done;

    expect(api.fetchUser.mock.calls.length).toBe(0);
    expect(dispatchedActions).toContainEqual(setLoginError('Please enter password!'));
});
