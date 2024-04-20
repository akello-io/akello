export class User{
    id: string
    email: string
    first_name: string
    last_name: string
    picture: string
    phone_number: string

    constructor(
        id: string,
        email: string,
        first_name: string,
        last_name: string,
        picture: string,
        phone_number: string
    ) {
        this.id = id
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.picture = picture
        this.phone_number = phone_number
    }
}

export class UserRegistry {
    user_id: string;
    registry_id: string;
    role: string;
    created_at: number;
    modified_at: number;

    constructor(
        user_id: string,
        registry_id: string,
        role: string,
        created_at: number,
        modified_at: number
    ) {
        this.user_id = user_id
        this.registry_id = registry_id
        this.role = role
        this.created_at = created_at
        this.modified_at = modified_at
    }
}


export class UserOrganization {
    user_id: string
    organization_id: string
    role: string

    constructor(
        user_id: string,
        organization_id: string,
        role: string
    ) {
        this.user_id = user_id
        this.organization_id = organization_id
        this.role = role
    }
}

export class UserOrganizationInvite {
    user_email: string
    organization_id: string
    invited_by_user_id: string
    role: string
    accepted: boolean

    constructor(
        user_email: string,
        organization_id: string,
        invited_by_user_id: string,
        role: string,
        accepted: boolean
    ) {
        this.user_email = user_email
        this.organization_id = organization_id
        this.invited_by_user_id = invited_by_user_id
        this.role = role
        this.accepted = accepted
    }
}

export class UserSession {
    user_id: string
    session_id: string
    user_agent: string
    ip_address: string

    constructor(
        user_id: string,
        session_id: string,
        user_agent: string,
        ip_address: string
    ) {
        this.user_id = user_id
        this.session_id = session_id
        this.user_agent = user_agent
        this.ip_address = ip_address
    }
}

export class UserInvite {
    object_type: string
    object_id: string
    user_email: string
    user_phone_number: string
    invited_by_user_id: string
    role: string
    accepted: boolean
    payload: any

    constructor(
        object_type: string,
        object_id: string,
        user_email: string,
        user_phone_number: string,
        invited_by_user_id: string,
        role: string,
        accepted: boolean,
        payload: any
    ) {
        this.object_type = object_type
        this.object_id = object_id
        this.user_email = user_email
        this.user_phone_number = user_phone_number
        this.invited_by_user_id = invited_by_user_id
        this.role = role
        this.accepted = accepted
        this.payload = payload
    }

}