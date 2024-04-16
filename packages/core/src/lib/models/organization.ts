import { User } from './user'

export class Organization {

    id: string
    name: string
    stripe_customer_id: string
    created_by: User

    constructor(
        id: string,
        name: string,
        stripe_customer_id: string,
        created_by: User
    ) {
        this.id = id
        this.name = name
        this.stripe_customer_id = stripe_customer_id
        this.created_by = created_by
    }
}


export class OrganizationRegistry {
    registry_id: string
    organization_id: string

    constructor(
        registry_id: string,
        organization_id: string
    ) {
        this.registry_id = registry_id
        this.organization_id = organization_id
    }
}

