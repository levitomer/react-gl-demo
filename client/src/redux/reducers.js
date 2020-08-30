import { combineReducers } from 'redux';
import filters from './filters/reducers';
import markers from './markers/reducers';

const reducers = combineReducers({
    filters,
    markers,
});

export default reducers;
