import { Category, Subcategory } from './categories';
import { Moderation } from './moderation'

export interface ArticleInfo {
    articleId: string,
    title: string,
    subtitle: string
    author: string,
    category: Category,
    subcategory: Subcategory,
    thumbURL: string,
    writtenDate: number,
    cas: Array<String>,
    references: Array<String>,
    moderations: Array<Moderation>,
}

export interface Article extends ArticleInfo {
    body: string,
}

export interface DraftArticleInfo {
    articleId: string,
    title?: string,
    subtitle?: string
    author: string,
    category?: Category,
    subcategory?: Subcategory,
    thumbURL?: string,
    writtenDate: number,
    cas?: Array<String>,
    references?: Array<String>,
    moderations?: Array<Moderation>,
}