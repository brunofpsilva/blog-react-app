import { Comment } from "../types/Comment";

/** Builds the reply tree from a flat comment list (linked by parent_id) and returns the root comments. */
export const _nest = (comments: Omit<Comment, "replyComments">[]): Comment[] => {
    const byId = new Map<number, Comment>(
        comments.map((comment) => [comment.id, { ...comment, replyComments: [] }])
    );
    const roots: Comment[] = [];

    for (const comment of byId.values()) {
        const parent = comment.parent_id === null ? undefined : byId.get(comment.parent_id);
        // a reply whose parent is missing is shown as a root comment instead of being dropped
        if (parent) parent.replyComments.push(comment);
        else roots.push(comment);
    }

    return roots;
}

/** Today's date as YYYY-MM-DD, the format the API stores. */
export const today = () => new Date().toISOString().slice(0, 10);
