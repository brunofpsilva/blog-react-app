import { Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useGlobalState from "../hooks/useContext";
import { Post } from "../types/Post";

export function PostDetails() {
    const [post, setPost] = useState<Post | undefined>();

    const { getPost } = useGlobalState();
    const { id = '' } = useParams();

    useEffect(() => (
        setPost(getPost(+id))
    ), []);

    return (
        <>
            {post &&
                <Container>
                    <Typography
                        variant="h2"
                        sx={{
                            my: 5
                        }}>
                        {post.title}
                    </Typography>
                    <Divider />
                </Container>
            }
        </>
    )
}