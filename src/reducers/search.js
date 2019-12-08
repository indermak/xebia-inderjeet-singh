import { SEARCH } from '../constants';

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH.SEARCH_REQUEST:
            return {
                ...state,
                planet: action.planet,
                isLoading: true,
                result: null,
                error: false,
            };
        case SEARCH.SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: action.result,
                error: false,
            };
        case SEARCH.SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                result: null,
                error: action.error,
            };
        default:
            return state;
    }
};

export default searchReducer;
