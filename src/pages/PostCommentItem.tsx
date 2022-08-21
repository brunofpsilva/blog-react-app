import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

interface IProps {
    content: string;
    date: string;
    user: string;
    hasReply?: boolean;
}

export function PostCommentsItem({
    content,
    date,
    user,
    hasReply,
}: IProps) {
    return (
        <>
            <ListItem
                disableGutters
                sx={{
                    alignItems: 'flex-start',
                    py: 2,
                    ...(hasReply && {
                        ml: 'auto',
                        width: (theme) => `calc(100% - ${theme.spacing(7)})`,
                    }),
                }}>

                <ListItemAvatar>
                    <Avatar alt={user} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>

                <ListItemText
                    primary={user}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={
                        <>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    color: 'text.disabled',
                                }}
                            >
                                {date}
                            </Typography>
                            <Typography component="span" variant="body2">
                                {content}
                            </Typography>
                        </>
                    }
                >

                </ListItemText>

            </ListItem>

            <Divider
                sx={{
                    ml: 'auto',
                    width: (theme) => `calc(100% - ${theme.spacing(7)})`,
                }}
            />

        </>
    )
}