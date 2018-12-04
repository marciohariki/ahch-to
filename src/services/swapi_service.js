const SWAPI_ADDRESS = `https://swapi.co/api/`

export function getSwapi(endpoint) {
    return fetch(`${SWAPI_ADDRESS}${endpoint}`)
        .then(response => response.json())
}