import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalState from "../hooks/useContext";
import { Post } from "../types/Post";
import { PostCommentsList } from "./PostCommentList";

export function PostDetails() {
    const [post, setPost] = useState<Post | undefined>();

    const { getPost } = useGlobalState();
    const { id = '' } = useParams();

    useEffect(() => {
        if (!post) setPost(getPost(+id));
        console.log(post);
    }, [getPost, post, id]);

    return (
        <>
            {post &&
                <Container>

                    <Typography
                        variant="h2"
                        sx={{
                            mt: 5
                        }}>
                        {post.title}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="overline">
                        {post.publish_date}
                    </Typography>

                    <Typography variant="body1">
                        by {post.author}
                    </Typography>

                    <Typography variant="h5" sx={{ my: 3 }}>
                        {post.description}
                    </Typography>

                    <p>
                        {post.content}
                    </p>

                    <Divider />

                    <Typography sx={{ my: 2 }} variant="h6">Comments:</Typography>

                    <PostCommentsList post={post} />

                </Container>
            }
        </>
    )
}