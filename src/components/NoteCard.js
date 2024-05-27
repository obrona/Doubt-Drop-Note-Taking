import React, { useEffect } from 'react';
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons';
import { yellow, green, pink, blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        background: (note) => (note.category == 'work') ? yellow[700] 
                                                        : (note.category == 'money') 
                                                        ? green[500]
                                                        : (note.category == 'todos')
                                                        ? pink[500]
                                                        : blue[500]

    }
})



export function NoteCard({ note, handleDelete }) {
    

    const classes = useStyles(note);
    return (
        <div>
            <Card elevation={1}>
                <CardHeader 
                    avatar={<Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>}
                    action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutline />
                    </IconButton>}
                    title={note.title}
                    subheader={note.category} />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>)
}