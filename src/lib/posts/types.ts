

export type PostMatter = {
    id: string;
    title: string;
    tags: string[];
    create_date: Date;
    update_date: Date;
    hidden?: boolean;
    pinned?: boolean;
}