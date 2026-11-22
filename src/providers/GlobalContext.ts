import { createContext } from "react";
import { CommentForm } from "../types/Comment";
import { Post } from "../types/Post";

export type GlobalContextProps = {
    posts: Post[];
    addComment: (post: string | number, comment: CommentForm) => Promise<void>;
    editComment: (id: number, comment: CommentForm) => Promise<void>;
    getPost: (post: number) => Post | undefined;
}

export const GlobalContext = createContext<GlobalContextProps>({
    posts: [],
    addComment: async () => { },
    editComment: async () => { },
    getPost: () => undefined
});
