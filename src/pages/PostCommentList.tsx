import { Box, List } from "@mui/material";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
import { PostCommentsItem } from "./PostCommentItem";

interface IProps {
    post: Post;
}

export function PostCommentsList({ post }: IProps) {

    const CommentItem: any = (comment: Comment) => {
        const hasReply = comment.replyComments.length > 0;
        return (
            <>
                <PostCommentsItem
                    key={comment.id}
                    date={comment.date}
                    user={comment.user}
                    content={comment.content}
                    hasReply
                />
                {
                    hasReply &&
                    comment.replyComments.map((reply) => (
                        CommentItem(reply)
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


                return (
                    <Box key={id}>
                        <PostCommentsItem
                            content={content}
                            date={date}
                            user={user}
                        />
                        {
                            hasReply &&
                            replyComments.map((reply) => (
                                CommentItem(reply)
                            ))
                        }
                    </Box>
                )
            })}
        </List>
    )
}