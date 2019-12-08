import { runSaga } from 'redux-saga';

import { getPlanet, handleSearch } from '../searchSaga';
import * as api from '../../api'; // we'll mock the fetchImages api
import { searchSuccess, searchFail } from '../../actions';

test('selector should return the desired planet', () => {
    const planet = 'Alderaan';
    const state = {
        search: {
            planet
        }
    };
    const res = getPlanet(state);
    expect(res).toBe(planet);
});

test('should load and handle search results in case of success', async () => {
    const dispatchedActions = [];

    const mockedResult = {
            "results": [{
                "climate": "temperate",
                "created": "2014-12-10T11:35:48.479000Z",
                "diameter": "12500",
                "edited": "2014-12-20T20:58:18.420000Z",
                "films": [
                    "https://swapi.co/api/films/6/",
                    "https://swapi.co/api/films/1/"
                ],
                "gravity": "1 standard",
                "name": "Alderaan",
                "orbital_period": "364",
                "population": "2000000000",
                "residents": [
                    "https://swapi.co/api/people/5/",
                    "https://swapi.co/api/people/68/",
                    "https://swapi.co/api/people/81/"
                ],
                "rotation_period": "24",
                "surface_water": "40",
                "terrain": "grasslands, mountains",
                "url": "https://swapi.co/api/planets/2/"
            }],
    };
        
    api.fetchPlanets = jest.fn(() => Promise.resolve(mockedResult));

    const store = {
        getState: () => ({
            search: {
                planet: 'Aldeeran'
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(store, handleSearch).done;
    expect(api.fetchPlanets.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(searchSuccess(mockedResult.results));
});

test('should handle planets load errors in case of failure', async () => {
    const dispatchedActions = [];

    const error = 'No Planets found!';
    api.fetchPlanets = jest.fn(() => Promise.reject(error));

    const store = {
        getState: () => ({
            search: {
                planet: 'qwerty'
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleSearch).done;
    
    expect(api.fetchPlanets.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(searchFail(error));
});

test('should handle planets load errors in case of no planet', async () => {
    const dispatchedActions = [];

    const error = 'Start typing to find planets.';
    api.fetchPlanets = jest.fn(() => Promise.reject(error));

    const store = {
        getState: () => ({
            search: {
                planet: ''
            }
        }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(store, handleSearch).done;

    expect(api.fetchPlanets.mock.calls.length).toBe(0);
    expect(dispatchedActions).toContainEqual(searchFail(error));
});