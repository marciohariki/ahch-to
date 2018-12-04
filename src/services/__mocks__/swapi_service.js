
import { peopleMock } from "./people_mock";

export function getSwapi(endpoint) {
    switch(endpoint) {
        case 'people': {
            return Promise.resolve(peopleMock)
        }
    }
    return Promise.resolve('mock')
}