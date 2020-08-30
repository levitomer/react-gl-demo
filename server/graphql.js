const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
const data = require('./json/data.json');

const server = express();
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

server.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
            type Geometry {
                type: String!
                coordinates: [[[Float]!]!]
            }

            type Properties {
                id: String!
                valuePerSqm: Float!
                growth: Float!
                selected: Boolean
            }

            type Marker {
                _id: ID!
                type: String!
                geometry: Geometry!
                properties: Properties!
            }

      
            type RootQuery {
                markers: [Marker!]!
            }

            type RootMutation {
                updateMarker(id: String!): Marker!
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            markers: () => {
                return data.features;
            },
            updateMarker: (args) => {
                const marker = data.find(({ id }) => id === args.id); // event name
                marker.properties.selected = true;
                return marker;
            },
        },
        graphiql: true,
    })
);

server.listen(3000);
