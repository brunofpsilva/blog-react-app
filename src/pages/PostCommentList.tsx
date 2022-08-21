import { Box, List } from "@mui/material";
import { Post } from "../types/Post";
import { PostCommentsItem } from "./PostCommentItem";

interface IProps {
    post: Post;
}

export function PostCommentsList({ post }: IProps) {
    return (
        <List disablePadding>
            {/* {post.comments.map((comment) => {
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
                            replyComments.map((reply) => {
                                return (
                                    <PostCommentsItem
                                        key={reply.id}
                                        date={date}
                                        user={user}
                                        content={content}
                                        hasReply
                                    />
                                )
                            })
                        }
                    </Box>
                )
            })} */}
        </List>
    )
}