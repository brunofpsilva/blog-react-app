// mui
import {
    Avatar,
    Box,
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
// formik
import {
    Form,
    FormikProvider,
    useFormik
} from "formik";
// react
import { useState } from "react";
// types
import { Comment, CommentForm } from "../types/Comment";
// hooks
import useGlobalState from '../hooks/useContext';
//
import * as Yup from 'yup';

interface IProps {
    comment: Comment;
    action: any;
    levelReply: number;
    hasReply?: boolean
}

export function CustomListItem({
    comment,
    action,
    hasReply,
    levelReply
}: IProps) {
    const [onEdit, setEdit] = useState(false);
    const { editComment } = useGlobalState();

    const handleOpenEdit = () => {
        setEdit(true);
    };

    const handleCloseEdit = () => {
        setEdit(false);
        editForm.setValues({
            content: comment.content,
            date: comment.date,
            parent_id: comment.parent_id,
            postId: comment.postId,
            user: comment.user
        });
    };

    const editForm = useFormik<CommentForm>({
        initialValues: {
            content: comment.content,
            date: comment.date,
            parent_id: comment.parent_id,
            postId: comment.postId,
            user: comment.user
        },
        validationSchema: Yup.object().shape({
            content: Yup.string().required("Required! Cannot be empty.")
        }),
        onSubmit: async (values) => {
            editComment(comment.id, values)
            handleCloseEdit()
        }
    })

    const { touched, errors, handleSubmit, getFieldProps } = editForm;

    return (
        <ListItem
            disableGutters
            sx={{
                alignItems: 'flex-start',
                py: 2,
                ...(hasReply && {
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7 * levelReply)})`,
                }),
            }}>

            <ListItemAvatar>
                <Avatar alt={comment.user} sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>

            <ListItemText
                primary={comment.user}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={
                    <>
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                color: 'text.disabled',
                            }}>
                            {comment.date}
                        </Typography>
                        {!onEdit ?
                            <>
                                <Typography
                                    component="span"
                                    variant="body2">
                                    {comment.content}
                                </Typography>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={handleOpenEdit}
                                    sx={{ display: "block", mt: 1 }}>
                                    Edit
                                </Button>
                            </>
                            :
                            <FormikProvider value={editForm}>
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    <TextField
                                        size="small"
                                        multiline
                                        {...getFieldProps('content')}
                                        error={Boolean(touched.content && errors.content)}
                                        helperText={touched.content && errors.content}
                                        fullWidth />
                                    <Box sx={{ display: "block", mt: 1 }}>
                                        <Button
                                            size="small"
                                            type="submit"
                                            variant="outlined">
                                            Confirm
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="inherit"
                                            onClick={handleCloseEdit}
                                            sx={{ ml: 1 }} >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Form>
                            </FormikProvider>
                        }
                    </>
                } />
            {action}
        </ ListItem >
    )
}