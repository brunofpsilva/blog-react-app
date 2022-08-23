import { PostfixUnaryExpression } from "typescript";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";

export const _nest = (comments: Comment[]) => {
    var map: any = {}, node, roots = [], i;

    for (i = 0; i < comments.length; i += 1) {
        map[comments[i].id] = i;
        comments[i].replyComments = [];
    }

    for (i = 0; i < comments.length; i += 1) {
        node = comments[i];
        if (node.parent_id !== null) {
            comments[map[node.parent_id]].replyComments.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
}

export const _addReply = (comments: Comment[], comment: Comment) => {
    comment.replyComments = []
    comments.map((_c) => {
        // eslint-disable-next-line
        if (_c.id == comment.parent_id) {
            _c.replyComments.push(comment)
        } else {
            _addReply(_c.replyComments, comment)
        }
        return null;
    });

    return comments;
}