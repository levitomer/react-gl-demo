import React, { useState } from 'react';
import { render } from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import {
    LightingEffect,
    AmbientLight,
    _SunLight as SunLight,
} from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';

// Set your mapbox token here
const MAPBOX_TOKEN =
    'pk.eyJ1IjoibGV2aXRvbWVyIiwiYSI6ImNqbjFxcDUwbjF6MnQzd3F2OGRzYjF2cG0ifQ.Dcp1r_2cekfaut4RJPKdzg'; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
    .domain([
        -0.6,
        -0.45,
        -0.3,
        -0.15,
        0,
        0.15,
        0.3,
        0.45,
        0.6,
        0.75,
        0.9,
        1.05,
        1.2,
    ])
    .range([
        [65, 182, 196],
        [127, 205, 187],
        [199, 233, 180],
        [237, 248, 177],
        // zero
        [255, 255, 204],
        [255, 237, 160],
        [254, 217, 118],
        [254, 178, 76],
        [253, 141, 60],
        [252, 78, 42],
        [227, 26, 28],
        [189, 0, 38],
        [128, 0, 38],
    ]);

const INITIAL_VIEW_STATE = {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
    bearing: 0,
};

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
});

const dirLight = new SunLight({
    timestamp: Date.UTC(2019, 7, 1, 22),
    color: [255, 255, 255],
    intensity: 1.0,
    _shadow: true,
});

const landCover = [
    [
        [-123.0, 49.196],
        [-123.0, 49.324],
        [-123.306, 49.324],
        [-123.306, 49.196],
    ],
];

function getTooltip({ object }) {
    return (
        object && {
            html: `\
              <div><b>Average Property Value</b></div>
              <div>${object.properties.valuePerParcel} / parcel</div>
              <div>${object.properties.valuePerSqm} / m<sup>2</sup></div>
              <div><b>Growth</b></div>
              <div>${Math.round(object.properties.growth * 100)}%</div>
              `,
        }
    );
}

export default function App({
    markers,
    onMarkerClick,
    mapStyle = 'mapbox://styles/mapbox/dark-v9',
}) {
    const data = { type: 'FeatureCollection', features: [...markers] };
    const [effects] = useState(() => {
        const lightingEffect = new LightingEffect({ ambientLight, dirLight });
        lightingEffect.shadowColor = [0, 0, 0, 0.5];
        return [lightingEffect];
    });

    const layers = [
        // only needed when using shadows - a plane for shadows to drop on
        new PolygonLayer({
            id: 'ground',
            data: landCover,
            stroked: false,
            getPolygon: (f) => f,
            getFillColor: [0, 0, 0, 0],
        }),
        new GeoJsonLayer({
            id: 'geojson',
            data,
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            getElevation: (f) => Math.sqrt(f.properties.valuePerSqm) * 10,
            getFillColor: (f) =>
                f.properties.selected
                    ? [65, 105, 225]
                    : COLOR_SCALE(f.properties.growth),
            getLineColor: [255, 255, 255],
            pickable: true,
        }),
    ];

    return (
        <DeckGL
            layers={layers}
            effects={effects}
            initialViewState={INITIAL_VIEW_STATE}
            getTooltip={getTooltip}
            onClick={(event) => {
                if (event.object) {
                    onMarkerClick(event.object.properties.id);
                }
            }}
            controller
        >
            <StaticMap
                reuseMaps
                mapStyle={mapStyle}
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    );
}

export function renderToDOM(container) {
    render(<App />, container);
}
