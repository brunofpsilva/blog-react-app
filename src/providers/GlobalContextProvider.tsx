import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Comment, CommentForm } from "../types/Comment";
import { Post } from "../types/Post";
import { nest } from "../utils";

export type GlobalContextProps = {
    posts: Post[];
    fetchPosts: () => void;
    newComment: (post: string | number, comment: CommentForm) => void;
    getPost: (post: number) => Post | undefined;
}

const initialState: GlobalContextProps = {
    posts: [],
    fetchPosts: () => { },
    newComment: (_post: string | number, comment: CommentForm) => { },
    getPost: (_post: number) => { return undefined }
}

export const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        let nestedComments: Comment[] = [];
        const posts: Post[] = await (await fetch("http://localhost:9000/posts")).json();
        const comments: Comment[] = await (await fetch("http://localhost:9000/comments")).json();

        console.log(comments);

        comments.map((comment) => comment.replyComments = []);
        nestedComments = nest(comments);

        posts.map((post) => {
            post.comments = [];
            nestedComments.map(comment => {
                if (post.id == comment.postId) {
                    post.comments.push(comment);
                }
                return null;
            })
            return null;
        })

        setPosts(posts);
    }

    const newComment = async (post: string | number, comment: CommentForm) => {
        const response = await axios.post(`http://localhost:9000/posts/${post}/comments`, comment);
    }

    const getPost = (_id: number) => {
        return posts.find((post) => post.id === _id);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                posts,
                fetchPosts,
                newComment,
                getPost
            }}>
            {children}
        </GlobalContext.Provider>
    );
}