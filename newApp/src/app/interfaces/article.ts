import { Category, Subcategory } from './categories';
import { Moderation } from './moderation'

export interface Article {
    articleId: string,
    title: string,
    subtitle: string
    author: string,
    category: Category,
    subcategory: Subcategory,
    thumbURL: string,
    body: string,
    writtenDate: number,
    cas: Array<String>,
    references: Array<String>,
    moderations: Array<Moderation>,
}

export interface Draft {

}