export interface StaffProfile {
    readonly uid: string,
    public: boolean,
    email: string,
    firstName: string,
    lastName: string,
    description: string,
    photoURL: string,
    roles: Array<string>,
    permission: number
}

export interface StaffList {
    readonly [index: string]: StaffProfile
}