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
        let nestedComments: Comment[] = [];
        const posts: Post[] = await (await fetch("http://localhost:9000/posts")).json();
        const comments: Comment[] = await (await fetch("http://localhost:9000/comments")).json();

        comments.map((comment) => comment.replyComments = []);
        nestedComments = nest(comments);

        posts.map((post) => {
            post.comments = [];
            nestedComments.map(comment => {
                if(post.id === comment.postId) {
                    post.comments.push(comment);
                }
                return null;
            })
            return null;
        })

        setPosts(posts);
    }

    const nest = (comments: Comment[]) => {
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