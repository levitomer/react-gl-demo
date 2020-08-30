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
                        valuePerSqm
                        growth
                        selected
                    }
                }
            }          
        `,
    };

    fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(res.status);
                throw new Error(`Failed with status ${res.status}`);
            }
            return res.json();
        })
        .then((res) => res.data.markers)
        .catch((err) => {
            console.log(err);
        });
}
