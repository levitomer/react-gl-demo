import * as types from './types';
import { createReducer } from '../utils';

const initialState = {
    data: [],
    loading: false,
};

const reducers = {
    [types.FETCH_MAP_MARKERS_REQUEST]: (state) => {
        return { ...state, loading: true };
    },
    [types.FETCH_MAP_MARKERS_SUCCESS]: (state, payload) => {
        return { ...state, data: payload, loading: false };
    },
    [types.FETCH_MAP_MARKERS_FAILURE]: (state, payload) => {
        return { ...state, error: payload, loading: false };
    },
    [types.UPDATE_MAP_MARKER]: (state, payload) => {
        // send query to update a marker in db
        const marker = state.data.find(
            ({ properties }) => properties.id === payload.id
        );

        if (!marker.properties.selected) {
            marker.properties.selected = true;
        } else {
            marker.properties.selected = false;
        }
        return {
            ...state,
            data: [...state.data, marker],
        };
    },
};

export default createReducer(initialState, reducers);
