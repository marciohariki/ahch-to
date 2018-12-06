import fetch from 'cross-fetch'

const SWAPI_ADDRESS = 'https://swapi.co/api'

export default function doGet(endpoint) {
    fetch(`${SWAPI_ADDRESS}/${endpoint}`)
        .then(response => response.json())
}
