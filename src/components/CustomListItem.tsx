import * as Yup from 'yup';
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
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Comment } from "../types/Comment";

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

    const handleOpenEdit = () => {
        setEdit(true);
    };

    const handleCloseEdit = () => {
        setEdit(false);
        editForm.setValues(comment);
    };

    const editForm = useFormik<Comment>({
        initialValues: comment,
        validationSchema: Yup.object().shape({
            content: Yup.string().required("Required! Cannot be empty.")
        }),
        onSubmit: async (values) => {
            console.log("ok");
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
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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