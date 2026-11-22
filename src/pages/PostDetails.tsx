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
import { useState } from "react";
import { useParams } from "react-router-dom";
// hooks
import useGlobalState from "../hooks/useContext";
import { CommentForm } from "../types/Comment";
// components
import { PostCommentsList } from "./sections/PostCommentList";
//icons
import {
    CgCloseO,
    CgComment
} from "react-icons/cg";
//
import * as Yup from 'yup';
import { today } from "../utils";

export function PostDetails() {
    const [onComment, setComment] = useState(false);

    const { getPost, addComment } = useGlobalState();
    const { id = '' } = useParams();
    const post = getPost(+id);

    const handleOpenComment = () => {
        setComment(true);
    };

    const handleCloseComment = () => {
        setComment(false);
        commentForm.setValues(defaultComment);
    };

    const defaultComment: CommentForm = {
        content: "",
        date: today(),
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
            if (post) await addComment(post.id, values);
            handleCloseComment();
        }
    });

    const { touched, errors, handleSubmit, getFieldProps } = commentForm;

    return (
        <>
            {post &&
                <Container>
                    <Typography
                        variant="h5"
                        sx={{
                            my: 3,
                            fontWeight: 600
                        }}>
                        {post.description}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="overline">
                        {post.publish_date}
                    </Typography>

                    <Typography variant="body1">
                        by {post.author}
                    </Typography>

                    <p>
                        {post.content}
                    </p>

                    <Divider />

                    <Typography sx={{ my: 2, fontWeight: 600 }} variant="subtitle1">Comments:</Typography>

                    {
                        !onComment &&
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<CgComment />}
                            onClick={handleOpenComment}>
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
                                                startIcon={<CgComment />}
                                                size="small">
                                                Comment
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="inherit"
                                                startIcon={<CgCloseO />}
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