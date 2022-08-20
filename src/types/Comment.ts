export type Comment = {
    id: number;
    postId: number;
    parent_id: null | number;
    date: string;
    content: string;
}

