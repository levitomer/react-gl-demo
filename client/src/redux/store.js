import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [sagaMiddleware];
export const enhancers = [applyMiddleware(...middlewares)];

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configstore(initialState) {
    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(...enhancers)
    );

    Object.values(sagas).forEach((saga) => {
        return sagaMiddleware.run(saga);
    });

    return store;
}
