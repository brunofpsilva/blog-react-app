// mui
import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
// react
import {
    useEffect,
    useState
} from "react";
import { useParams } from "react-router-dom";
// hooks
import useGlobalState from "../hooks/useContext";
import { CommentForm } from "../types/Comment";
// types
import { Post } from "../types/Post";
// components
import { PostCommentsList } from "./PostCommentList";
//
import * as Yup from 'yup';

export function PostDetails() {
    const [post, setPost] = useState<Post | undefined>();
    const [onComment, setComment] = useState(false);

    const { getPost, newComment } = useGlobalState();
    const { id = '' } = useParams();

    const handleOpenComment = () => {
        setComment(true);
    };

    const handleCloseComment = () => {
        setComment(false);
        commentForm.setValues(defaultComment);
    };

    const defaultComment: CommentForm = {
        content: "",
        date: "2022-08-23",
        parent_id: null,
        user: "Bruno Silva",
        postId: post ? post.id : -1,
    }

    const commentForm = useFormik<CommentForm>({
        initialValues: defaultComment,
        validationSchema: Yup.object().shape({
            content: Yup.string().required("Required! Cannot be empty.")
        }),
        onSubmit: async (values) => {
            post && newComment(post.id, values)
            handleCloseComment();
        }
    });

    const { touched, errors, handleSubmit, getFieldProps } = commentForm;

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

                    {
                        !onComment &&
                        <Button variant="outlined" onClick={handleOpenComment}>
                            Comment
                        </Button>
                    }
                    {
                        onComment && (
                            <FormikProvider value={commentForm}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Box
                                        sx={{
                                            mb: 3,
                                            ml: 'auto',
                                        }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            {...getFieldProps('content')}
                                            error={Boolean(touched.content && errors.content)}
                                            helperText={touched.content && errors.content}
                                            placeholder={`New comment...`}
                                        />
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="small">
                                                Comment
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="inherit"
                                                onClick={handleCloseComment}
                                                sx={{ ml: 1 }} >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                </Form>
                            </FormikProvider>
                        )
                    }

                    <PostCommentsList post={post} />

                </Container>
            }
        </>
    )
}