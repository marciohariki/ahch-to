import fetch from 'cross-fetch'

const SWAPI_ADDRESS = 'https://swapi.co/api'

export function doGet(endpoint) {
    return fetch(`${SWAPI_ADDRESS}/${endpoint}`)
        .then(response => response.json())
}
