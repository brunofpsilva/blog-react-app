import { createContext, ReactNode, useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";

export type GlobalContextProps = {
    posts: Post[];
    fetchPosts: () => void;
    newComment: (post: string) => void;
    getPost: (post: number) => Post | undefined;
}

const initialState: GlobalContextProps = {
    posts: [],
    fetchPosts: () => { },
    newComment: (post: string) => { },
    getPost: (post: number) => { return undefined }
}

export const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        let comments: Comment[] = [];

        const posts: Post[] = await (await fetch("http://localhost:9000/posts")).json();
        const comments_temp: Comment[] = await (await fetch("http://localhost:9000/comments")).json();

        comments_temp.map((_comment) => {
            _comment.replyComments = [];
            if (_comment.parent_id === null) {
                comments.push(_comment);
            } else {
                const parent_index = comments.findIndex((_p) => _p.id === _comment.parent_id);

                if (parent_index === -1) {

                }

                comments[parent_index].replyComments.push(_comment);
            }
        })

        setPosts(posts);
    }

    const newComment = (post: string) => {
        console.log(post);
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