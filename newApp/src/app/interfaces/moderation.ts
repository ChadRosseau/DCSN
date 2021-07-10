export interface Moderation {
    checklist: Criteria,
    publishReady: boolean,
    comments?: String,
    author: String
    timestamp?: number
}

export interface Criteria {
    criteria: boolean,
    neutral: boolean,
    law: boolean,
    language: boolean,
    references: boolean,
    cas: boolean,
    graphics: boolean,
    formatting: boolean
}