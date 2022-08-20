import { createContext, ReactNode, useState } from "react";
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
        const response: Post[] = await (await fetch("http://localhost:9000/posts")).json();
        setPosts(response);
    }

    const newComment = (post: string) => {
        console.log(post);
    }

    const getPost = (_id: number) => {
        return posts.find((post) => post.id === _id);
    }

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