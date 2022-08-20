import { Container, Divider, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalState from "../hooks/useContext";
import { Post } from "../types/Post";

const DescriptionStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h5,
    marginTop: 10,
}));

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
                </Container>
            }
        </>
    )
}