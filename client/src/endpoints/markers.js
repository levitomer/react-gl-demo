export function fetchMarkers() {
    const body = {
        query: `
            query {
                markers {
                    geometry {
                        type
                        coordinates
                    }
                    properties {
                        id
                        valuePerSqm
                        growth
                        selected
                    }
                }
            }          
        `,
    };

    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error(`Failed with status ${res.status}`);
            }
            return res.json();
        })
        .then((res) => {
            return res.data.markers;
        })
        .catch((err) => {
            console.log(err);
        });
}
