import React, { useEffect, useState } from 'react';
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent, IconButton, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Tooltip } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons';
import { yellow, green, pink, blue } from '@material-ui/core/colors';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { db } from '../firebase'
import { updateDoc, doc } from 'firebase/firestore'


const useStyles = makeStyles({
    avatar: {
        background: (obj) => (obj.category == 'work') ? yellow[700] 
                                                        : (obj.category == 'money') 
                                                        ? green[500]
                                                        : (obj.category == 'todos')
                                                        ? pink[500]
                                                        : blue[500]

    }, field: {
        margin: '20px auto',
        width: '90%',
        display: 'block'
    }, btn: {
        margin: '20px 15px'
    }
})


function Editing({ note, setEdit, deleteNote, noteTitle, setNoteTitle, noteDetails, setNoteDetails, noteCategory, setNoteCategory }) {
    console.log(note.id)
    const classes = useStyles()
    const [title, setTitle] = useState(noteTitle)
    const [details, setDetails] = useState(noteDetails)
    const [category, setCategory] = useState(noteCategory)

    function HoverButton({ text, icon, action }) {
        return (
            <Tooltip title={text}>
                <IconButton color='secondary' variant='outlined' onClick={action}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    function uploadChanges() {
        const docRef = doc(db, 'Notes', note.id)
        updateDoc(docRef, {
            title: title,
            details: details,
            category: category

        }).then(() => {
            setNoteTitle(title)
            setNoteDetails(details)
            setNoteCategory(category)
            setEdit(false)
        }).catch(err => alert(err.message))

    }
    return (
        <Card elevation={1}>
            <form noValidate autoComplete='off'>
            <TextField className={classes.field} label='Title' variant='outlined' value={title} onChange={e => setTitle(e.target.value)} fullWidth/>
            <TextField className={classes.field} label='Details' variant='outlined' value={details} onChange={e => setDetails(e.target.value)} minRows={4} multiline fullWidth/>
            <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
                    <FormControlLabel value='money' control={<Radio />} label='Money' />
                    <FormControlLabel value='todos' control={<Radio />} label='Todos' />
                    <FormControlLabel value='reminder' control={<Radio />} label='Reminder' />
                    <FormControlLabel value='work' control={<Radio />} label='Work' />
                </RadioGroup>
            </FormControl>
            <div style={{width: '90%', margin: '20px auto'}}>
                <HoverButton text='Upload Changes' icon={<BackupOutlinedIcon />} action={uploadChanges} />
                <HoverButton text='Delete Note' icon={<DeleteOutlineOutlinedIcon />} action={deleteNote} />
                <HoverButton text='Go Back' icon={<BackspaceOutlinedIcon />} action={() => setEdit(false)} />
            </div>
            </form>
        </Card>
    )
}









export function NoteCard({ note, handleDelete }) {
    const [edit, setEdit] = useState(false)
   
    const [noteTitle, setNoteTitle] = useState(note.title)
    const [noteDetails, setNoteDetails] = useState(note.details)
    const [noteCategory, setNoteCategory] = useState(note.category)
    const classes = useStyles({category: noteCategory})
    
    return (edit) ? <Editing note={note} setEdit={setEdit} deleteNote={() => handleDelete(note.id)} 
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle} 
        
        noteDetails={noteDetails}
        setNoteDetails={setNoteDetails}
        
        noteCategory={noteCategory} 
        setNoteCategory={setNoteCategory}/> : (
        <Card elevation={1}>
                <CardHeader 
                    avatar={<Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>}
                    action={
                    <IconButton onClick={() => setEdit(true)}>
                        <MenuOutlinedIcon />
                    </IconButton>}
                    title={noteTitle}
                    subheader={noteCategory} />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {noteDetails}
                    </Typography>
                </CardContent>
        </Card>
    )
}

