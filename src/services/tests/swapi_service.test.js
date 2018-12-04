import { getSwapi } from '../swapi_service.js'
jest.mock('../swapi_service.js');

it('shoud test get people api', () => {
    expect.assertions(1);
    return getSwapi('people').then(data => expect(data.results.length).toBe(2));
});