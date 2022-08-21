export type Comment = {
    id: number;
    postId: number;
    parent_id: null | number;
    user: string;
    date: string;
    content: string;

    replyComments: Comment[];
}

