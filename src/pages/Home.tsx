import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/Post";
import useGlobalState from "../hooks/useContext";

export default function Home() {
    const { posts } = useGlobalState();

    const navigate = useNavigate();

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
                    <Grid
                        key={post.id}
                        item
                        md={4}
                        xs={12}>
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