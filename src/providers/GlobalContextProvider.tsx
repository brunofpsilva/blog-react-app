// axios
import axios from "axios";
// react
import {
    createContext,
    ReactNode,
    useEffect,
    useState
} from "react";
// types
import {
    Comment,
    CommentForm
} from "../types/Comment";
import { Post } from "../types/Post";
// utils
import {
    _addReply,
    _nest
} from "../utils";

export type GlobalContextProps = {
    posts: Post[];
    fetchPosts: () => void;
    newComment: (post: string | number, comment: CommentForm) => void;
    newReply: (post: string | number, comment: CommentForm) => void;
    editComment: (id: number, comment: CommentForm) => void;
    getPost: (post: number) => Post | undefined;
}

const initialState: GlobalContextProps = {
    posts: [],
    fetchPosts: () => { },
    newComment: (_post: string | number, _comment: CommentForm) => { },
    newReply: (_post: string | number, _comment: CommentForm) => { },
    editComment: (_id: number, _comment: CommentForm) => { },
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

        comments.map((comment) => comment.replyComments = []);
        nestedComments = _nest(comments);

        posts.map((post) => {
            post.comments = [];
            nestedComments.map(comment => {
                // eslint-disable-next-line
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
        const index = posts.findIndex(_post => _post.id == post);

        posts[index].comments.push({
            content: comment.content,
            date: comment.date,
            id: -1,
            parent_id: comment.parent_id,
            postId: comment.postId,
            replyComments: [],
            user: comment.user
        });
        await axios.post(`http://localhost:9000/posts/${post}/comments`, comment);
    }

    const newReply = async (post: string | number, comment: CommentForm) => {
        const response = await axios.post(`http://localhost:9000/posts/${post}/comments`, comment);
        // eslint-disable-next-line
        const index = posts.findIndex(_post => _post.id == post);
        const comments = _addReply(posts[index].comments, response.data);

        setPosts(current => {
            return {
                ...current,
                replyComments: comments
            }
        });
    }

    const editComment = async (id: number, comment: CommentForm) => {
        await axios.put(`http://localhost:9000/comments/${id}/`, comment);
        window.location.reload()
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
                newReply,
                newComment,
                editComment,
                getPost
            }}>
            {children}
        </GlobalContext.Provider>
    );
}