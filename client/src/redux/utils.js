export function createReducer(initialState, handlers) {
    return (state = initialState, action) => {
        const reducer = handlers[action.type];
        return reducer ? reducer(state, action.payload, action.meta) : state;
    };
}
