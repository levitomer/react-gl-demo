import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import * as api from '../../endpoints/markers';

function* fetchMapMarkers() {
    try {
        const markers = yield call(api.fetchMarkers);
        yield put({ type: types.FETCH_MAP_MARKERS_SUCCESS, payload: markers });
    } catch (err) {
        yield put({ type: types.FETCH_MAP_MARKERS_FAILURE, payload: err });
    }
}

function* markersSaga() {
    yield takeLatest(types.FETCH_MAP_MARKERS_REQUEST, fetchMapMarkers);
}

export default markersSaga;
