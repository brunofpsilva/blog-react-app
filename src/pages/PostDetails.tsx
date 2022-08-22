// mui
import {
    Container,
    Divider,
    Typography
} from "@mui/material";
// react
import {
    useEffect,
    useState
} from "react";
import { useParams } from "react-router-dom";
// hooks
import useGlobalState from "../hooks/useContext";
// types
import { Post } from "../types/Post";
// components
import { PostCommentsList } from "./PostCommentList";

export function PostDetails() {
    const [post, setPost] = useState<Post | undefined>();

    const { getPost } = useGlobalState();
    const { id = '' } = useParams();

    useEffect(() => {
        if (!post) setPost(getPost(+id));
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