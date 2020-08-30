import * as types from './types';

export function updateMapMarker(id) {
    return { type: types.UPDATE_MAP_MARKER, id };
}

export function fetchMapMarkers() {
    return { type: types.FETCH_MAP_MARKERS_REQUEST };
}
