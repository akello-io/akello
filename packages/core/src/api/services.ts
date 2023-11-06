import { getUser } from './user'

export default class AkelloAPIService {

    getUser: any

    constructor() {
        this.getUser = getUser
    }
}