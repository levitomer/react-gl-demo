const data = require('../json/data.json');

const markers = () => {
    return data;
};

const updateMarker = (args) => {
    const marker = data.find(({ id }) => id === args.id); // event name
    marker.properties.selected = true;
    return marker;
};

module.exports = { markers, updateMarker };
