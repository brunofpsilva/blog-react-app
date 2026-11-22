// axios
import axios from "axios";
// react
import {
    createContext,
    ReactNode
} from "react";
// react-query
import {
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
// types
import {
    Comment,
    CommentForm
} from "../types/Comment";
import { Post } from "../types/Post";
// utils
import { _nest } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;

export type GlobalContextProps = {
    posts: Post[];
    addComment: (post: string | number, comment: CommentForm) => Promise<void>;
    editComment: (id: number, comment: CommentForm) => Promise<void>;
    getPost: (post: number) => Post | undefined;
}

const initialState: GlobalContextProps = {
    posts: [],
    addComment: async () => { },
    editComment: async () => { },
    getPost: () => undefined
}

export const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
    children: ReactNode;
}

const fetchPosts = async (): Promise<Post[]> => {
    const [{ data: posts }, { data: comments }] = await Promise.all([
        axios.get<Omit<Post, "comments">[]>(`${API_URL}/posts`),
        axios.get<Comment[]>(`${API_URL}/comments`),
    ]);
    const roots = _nest(comments);

    return posts.map((post) => ({
        ...post,
        // json-server stores postId as a string for comments created through /posts/:id/comments
        comments: roots.filter((comment) => Number(comment.postId) === post.id)
    }));
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const queryClient = useQueryClient();
    const { data: posts = [] } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

    const refetchPosts = () => queryClient.invalidateQueries({ queryKey: ["posts"] });

    const addComment = async (post: string | number, comment: CommentForm) => {
        await axios.post(`${API_URL}/posts/${post}/comments`, comment);
        await refetchPosts();
    }

    const editComment = async (id: number, comment: CommentForm) => {
        await axios.put(`${API_URL}/comments/${id}`, comment);
        await refetchPosts();
    }

    const getPost = (id: number) => posts.find((post) => post.id === id);

    return (
        <GlobalContext.Provider
            value={{
                posts,
                addComment,
                editComment,
                getPost
            }}>
            {children}
        </GlobalContext.Provider>
    );
}
