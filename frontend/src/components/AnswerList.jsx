import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const AnswerList = ({ question, answer }) => {
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    
                    <ListItemText
                        primary={question}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    variant="h1"
                                    color="red"
                                >
                                    {answer}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>

            </List>

        </>
    );
}

export default AnswerList;