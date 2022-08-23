// mui
import {
    Box,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
// react
import { useState } from "react";
import { CustomListItem } from "../components/CustomListItem";
import { Comment, CommentForm } from "../types/Comment";
import * as Yup from 'yup';
import useGlobalState from "../hooks/useContext";

interface IProps {
    comment: Comment;
    hasReply?: boolean;
    levelReply: number;
}

export function PostCommentsItem({
    comment,
    hasReply,
    levelReply
}: IProps) {
    const [onReply, setReply] = useState(false);
    const { newComment } = useGlobalState();

    const handleOpenReply = () => {
        setReply(true);
    };

    const handleCloseReply = () => {
        setReply(false);
        replyForm.setValues(defaultReply);
    };

    const defaultReply: CommentForm = {
        content: "",
        date: "2022-08-23",
        parent_id: comment.id,
        user: "Bruno Silva",
        postId: comment.postId,
    }

    const replyForm = useFormik<CommentForm>({
        initialValues: defaultReply,
        validationSchema: Yup.object().shape({
            content: Yup.string().required("Required! Cannot be empty.")
        }),
        onSubmit: async (values) => {
            newComment(comment.postId, values)
            handleCloseReply();
        }
    });

    const { touched, errors, handleSubmit, getFieldProps } = replyForm;

    return (
        <>
            <CustomListItem
                comment={comment}
                hasReply={hasReply}
                levelReply={levelReply}
                action={
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleOpenReply}
                        sx={{ position: 'absolute', right: 0 }}>
                        Reply
                    </Button>
                } />

            {
                onReply && (
                    <FormikProvider value={replyForm}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    mb: 3,
                                    ml: 'auto',
                                    width: (theme) => `calc(100% - ${theme.spacing(7 * levelReply)})`,
                                }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    {...getFieldProps('content')}
                                    error={Boolean(touched.content && errors.content)}
                                    helperText={touched.content && errors.content}
                                    placeholder={`Reply to ${comment.user}...`}
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
                                        onClick={handleCloseReply}
                                        sx={{ ml: 1 }} >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    </FormikProvider>
                )
            }

            <Divider
                sx={{
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7 * levelReply)})`,
                }}
            />
        </>
    )
}