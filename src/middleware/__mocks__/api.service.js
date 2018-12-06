
import { peopleMock } from "./people_mock";

export function doGet(endpoint) {
    switch(endpoint) {
        case 'people?page=1': {
            return Promise.resolve(peopleMock)
        }
    }
    return Promise.resolve('mock')
}