import { getPeopleByPage } from '../people.service'
jest.mock('../../middleware/api.service');

it('shoud test get people api', () => {
    expect.assertions(1);
    return getPeopleByPage(1).then(data => expect(data.items.length).toBe(2));
});