import { doGet } from '../middleware/api.service'


export function getPeopleByPage(page) {
    return doGet(`people?page=${page}`).then(data => {
        return {
            items: data.results,
            hasNext: !!data.next,
            hasPrevious: !!data.previous,
            receivedAt: Date.now()
        }
    })
}