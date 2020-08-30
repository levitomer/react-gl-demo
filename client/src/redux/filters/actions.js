export function filterMapBySqm(sqm) {
    return { type: types.FILTER_MAP_BY_SQM, sqm };
}

export function filterMapByPrice(price) {
    return { type: types.FILTER_MAP_BY_PRICE, price };
}

export function filterMapByGrowth(growth) {
    return { type: types.FILTER_MAP_BY_GROWTH, growth };
}
