import { Comment } from "../types/Comment";

export const nest = (comments: Comment[]) => {
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