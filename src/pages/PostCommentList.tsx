// mui
import {
    Box,
    List
} from "@mui/material";
// models
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
// components
import { PostCommentsItem } from "./PostCommentItem";

interface IProps {
    post: Post;
}

export function PostCommentsList({ post }: IProps) {

    const CommentReply: any = (comment: Comment, level: number) => {
        level++;
        const hasReply = comment.replyComments.length > 0;
        return (
            <Box key={comment.id}>
                <PostCommentsItem
                    comment={comment}
                    hasReply
                    levelReply={level}
                />
                {
                    hasReply &&
                    comment.replyComments.map((reply) => (
                        CommentReply(reply, level)
                    ))
                }
            </Box>
        )
    }

    return (
        <List disablePadding>
            {post.comments.map((comment) => {
                const { replyComments } = comment;
                const hasReply = replyComments.length > 0;
                const level = 0;

                return (
                    <Box key={comment.id}>
                        <PostCommentsItem
                            comment={comment}
                            levelReply={level}
                        />
                        {
                            hasReply &&
                            replyComments.map((reply) => (
                                CommentReply(reply, level)
                            ))
                        }
                    </Box>
                )
            })}
        </List>
    )
}