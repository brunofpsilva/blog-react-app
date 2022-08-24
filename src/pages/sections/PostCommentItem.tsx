// mui
import {
    Box,
    Button,
    Divider,
    TextField,
} from "@mui/material";
// formik
import {
    Form,
    FormikProvider,
    useFormik
} from "formik";
// react
import { useState } from "react";
// components
import { CustomListItem } from "../../components/CustomListItem";
// types
import {
    Comment,
    CommentForm
} from "../../types/Comment";
// hooks
import useGlobalState from "../../hooks/useContext";
//
import * as Yup from 'yup';
import { CgCloseO, CgComment, CgMailReply } from "react-icons/cg";

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
    const { newReply } = useGlobalState();

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
            newReply(comment.postId, values)
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
                        variant="text"
                        startIcon={<CgMailReply />}
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
                                        startIcon={<CgComment />}
                                        size="small">
                                        Comment
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<CgCloseO />}
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