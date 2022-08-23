export type Comment = {
    id: number;
    postId: number | string;
    parent_id: null | number;
    user: string;
    date: string;
    content: string;

    replyComments: Comment[];
}

export type CommentForm = {
    postId: number | string;
    parent_id: null | number;
    user: string;
    date: string;
    content: string;
}

