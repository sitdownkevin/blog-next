export type PostMatterType = {
    id: string;
    title: string;
    tags: string[];
    pinned?: boolean;
    hidden?: boolean;
    description?: string;
    create_date?: Date;
    update_date?: Date;
}


export type MarkdownType = {
    id: string;
    title: string;
    tags: string[];
    description?: string;
    create_date?: Date;
    update_date?: Date;
    content: string;
}