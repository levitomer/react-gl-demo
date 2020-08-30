import * as types from './types';
import { createReducer } from '../utils';

const initialState = {
    sqm: 50,
    price: 2000000,
    growth: 0.5,
};

const reducers = {
    [types.FILTER_MAP_BY_SQM]: (state, payload) => {
        return { ...state, sqm: payload.sqm };
    },
    [types.FILTER_MAP_BY_PRICE]: (state, payload) => {
        return { ...state, sqm: payload.price };
    },
    [types.FILTER_MAP_BY_GROWTH]: (state, payload) => {
        return { ...state, sqm: payload.growth };
    },
};

export default createReducer(initialState, reducers);
