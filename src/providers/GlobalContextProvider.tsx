// axios
import axios from "axios";
// react
import { ReactNode } from "react";
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
import { GlobalContext } from "./GlobalContext";

const API_URL = import.meta.env.VITE_API_URL;

type GlobalProviderProps = {
    children: ReactNode;
}

const fetchPosts = async (): Promise<Post[]> => {
    const [{ data: posts }, { data: comments }] = await Promise.all([
        axios.get<Omit<Post, "comments">[]>(`${API_URL}/posts`),
        axios.get<Omit<Comment, "replyComments">[]>(`${API_URL}/comments`),
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
