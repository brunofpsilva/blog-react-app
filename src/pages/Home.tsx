import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useContext"
import { Post } from "../types/Post";

export default function Home() {
    const { fetchPosts, posts } = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!posts.length) fetchPosts()
        console.log(posts);

    }, [fetchPosts, posts])

    const handleClickButton = (post: number) => {
        navigate(`/${post}`)
    }

    return (
        <Container>
            <Typography
                variant="h2"
                sx={{
                    my: 5
                }}>
                All Posts
            </Typography>

            <Divider />

            <Grid
                sx={{
                    my: 5
                }}
                container
                spacing={3}>

                {posts.map((post: Post) => (
                    <Grid item md={4} xs={12}>
                        <Box>
                            <Typography variant="h5">
                                {post.title}
                            </Typography>

                            <Typography variant="overline">
                                {post.publish_date}
                            </Typography>

                            <Typography variant="body1">
                                {post.description}
                            </Typography>

                            <Button
                                sx={{
                                    mt: 1
                                }}
                                variant="contained"
                                onClick={() => handleClickButton(post.id)}>
                                Read More
                            </Button>
                        </Box>
                    </Grid>
                ))}

            </Grid>

        </Container>
    )
}