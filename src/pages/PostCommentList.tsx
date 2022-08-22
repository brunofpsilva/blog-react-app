import { Box, List } from "@mui/material";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
import { PostCommentsItem } from "./PostCommentItem";

interface IProps {
    post: Post;
}

export function PostCommentsList({ post }: IProps) {

    const CommentReply: any = (comment: Comment) => {
        let level = 1;
        const hasReply = comment.replyComments.length > 0;
        return (
            <>
                <PostCommentsItem
                    key={comment.id}
                    date={comment.date}
                    user={comment.user}
                    content={comment.content}
                    hasReply
                    levelReply={level}
                />
                {
                    hasReply &&
                    comment.replyComments.map((reply) => (
                        CommentReply(reply)
                    ))
                }
            </>

        )
    }

    return (
        <List disablePadding>
            {post.comments.map((comment) => {
                const { content, date, id, user, replyComments } = comment;
                const hasReply = replyComments.length > 0;
                const level = 0;

                return (
                    <Box key={id}>
                        <PostCommentsItem
                            content={content}
                            date={date}
                            user={user}
                            levelReply={level}
                        />
                        {
                            hasReply &&
                            replyComments.map((reply) => (
                                CommentReply(reply)
                            ))
                        }
                    </Box>
                )
            })}
        </List>
    )
}