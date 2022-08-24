import {
    alpha,
    Card,
    Divider,
    Grid,
    Stack,
    styled,
    Typography
} from "@mui/material";
import { Container } from "@mui/system";
import {
    Link,
    useNavigate
} from "react-router-dom";
import { Post } from "../types/Post";
import useGlobalState from "../hooks/useContext";
import { CgComment, CgShare } from "react-icons/cg";

const CardStyle = styled(Card)(({ theme }) => ({
    padding: 20,
    minHeight: 200,
    boxShadow: `0 0 1px 0 ${alpha("#000", 0.15)}, 0 12px 20px -4px ${alpha("#000", 0.10)}`,
    display: "flex",
    flexDirection: "column"
}));

export default function Home() {
    const { posts } = useGlobalState();

    return (
        <Container>
            <Typography
                variant="h5"
                sx={{
                    my: 3,
                    fontWeight: 600
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
                        md={3}
                        xs={12}>
                        <CardStyle>

                            <Typography variant="overline">
                                {post.publish_date}
                            </Typography>
                            <Typography
                                component={Link}
                                to={`/${post.id}`}
                                variant="subtitle1"
                                sx={{
                                    display: "block",
                                    textDecoration: "none",
                                    color: "#212b36",
                                    fontWeight: 600,
                                    "&:hover": {
                                        textDecoration: "underline",
                                    }
                                }}>
                                {post.description}
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="flex-end"
                                sx={{
                                    typography: 'body2',
                                    flex: 1
                                }}>
                                <CgComment size={20} color="#919EAB" />
                                <Typography color="#919EAB" sx={{ ml: 1, p: 0 }} variant="caption">
                                    {post.comments.length}
                                </Typography>
                            </Stack>

                        </CardStyle>
                    </Grid>
                ))}

            </Grid>

        </Container>
    )
}