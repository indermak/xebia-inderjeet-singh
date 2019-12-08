import { put, call, takeEvery, select } from 'redux-saga/effects';
import { searchSuccess, searchFail } from '../actions';
import { SEARCH } from '../constants';
import { fetchPlanets } from '../api';

export const getPlanet = state => state.search.planet;

export function* handleSearch() {
    try {
        const planet = yield select(getPlanet);
        if (planet) {
            const retVal = yield call(fetchPlanets, planet);
            if (retVal && retVal.results && retVal.results.length) {
                yield put(searchSuccess(retVal.results));
            } else {
                yield put(searchFail('No Planets found!'));
            }
        } else {
            yield put(searchFail('Start typing to find planets.'));    
        }
    } catch (error) {
        yield put(searchFail(error.toString()));
    }
}


export default function* watchSearch() {
    yield takeEvery(SEARCH.SEARCH_REQUEST, handleSearch);
}
