/**
 * TODO: For future reorganization
 */

type BasePostType = {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    pinned?: boolean;
    hidden?: boolean;
    create_date?: Date;
    update_date?: Date;
}


export type PostCoverType = BasePostType & {
    content?: string;
    snippet?: string;
    snippetHtml?: string;
}


export type PostContentType = BasePostType & {
    markdown_content: string;
}