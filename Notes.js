import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Grid, Paper, Container, TextField, Button } from '@material-ui/core'
import { NoteCard } from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import { db, colRef } from '../firebase'
import { getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import UserContext from '../UserContext'

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    alignItems: 'center', // Center items vertically
    gap: '10px', // Add spacing between items
    marginBottom: '30px'
  },
  textField: {
    flexGrow: 1, // Allow the TextField to grow and take up available space
  },
});

export default function Notes() {
  const userContext = useContext(UserContext)
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [reset, setReset] = useState(false)
  
  // we only want to fetch 1 time, when we refresh the page, not everytime the page re-renders because of some small change like to a textfield
  /*useEffect(() => {
    fetch('http://localhost:8000/notes').then(res => res.json()).then(data => {
     
      setNotes(data)});
  }, [reset])*/

  useEffect(() => {
    const notes = []
    const q = query(colRef, where('email', '==', userContext.email))
    getDocs(q).then(snapshot => {
      snapshot.docs.forEach((d) => {
        notes.push({...d.data(), id: d.id});
        //console.log(d.id, d.data().title)
      })
    }).then(() => {
      setNotes(notes)
      //sessionStorage.setItem('notes', notes)
    })

    return () => setNotes([])
  }, [reset])

  /*async function handleDelete(id) {
    await fetch('http://localhost:8000/notes/' + id, {method: 'DELETE'})
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }*/

  function handleDelete2(id) {
    const docRef = doc(db, 'Notes', id)
    deleteDoc(docRef).then(() => {
      setNotes(notes.filter(note => note.id != id))
    })
  }

  

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  function handleSearch() {
    if (text != '') {
      const newNotes = notes.filter(note => (note.title.search(text) != -1 || note.details.search(text) != -1 || note.category.search(text) != -1));
      setNotes(newNotes);
    } else {
      // make useEffect run again by changing its dependencies
      setReset(!reset)
    }
    
  }
  
  return (
    <Container>
      <div className={classes.flex}>
        <TextField placeholder='Search or input empty string to reset' className={classes.textField} onChange={(e) => setText(e.target.value)} />
        <Button onClick={()=>handleSearch()}>Search</Button>
      </div>
      <Masonry breakpointCols={breakpoints} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
        {notes.map(note => (<div key={note.id}>
          <NoteCard note={note} handleDelete={handleDelete2}/></div>))}
      </Masonry>
    </Container>
    
  )
}
