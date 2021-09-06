/*
Defines the properties of a role, as well as all current roles.
*/

export interface Role {
    name: string,
    description: string,
    image: string,
    icon: string
}

export interface Roles {
    contributor: Role,
    moderator: Role,
    technology: Role,
    graphics: Role
}