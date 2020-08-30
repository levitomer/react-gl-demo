var fs = require('fs');
const data = require('./json/data.json');
const { v4: uuidv4 } = require('uuid');

const generateJSON = (json) => {
    return json.features.map((marker) => {
        marker.properties.id = uuidv4();

        return marker;
    });
};

fs.writeFileSync('data.json', JSON.stringify(generateJSON(data)));
