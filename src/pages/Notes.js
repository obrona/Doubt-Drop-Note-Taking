import React, { useEffect, useState } from 'react'
import { Grid, Paper, Container } from '@material-ui/core'
import { NoteCard } from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {
  // we only want to fetch 1 time, when we refresh the page, not everytime the page re-renders because of some small change like to a textfield
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/notes').then(res => res.json()).then(data => setNotes(data));
  })

  async function handleDelete(id) {
    await fetch('http://localhost:8000/notes/' + id, {method: 'DELETE'})
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };
  
  return (
    <Container>
      <Masonry breakpointCols={breakpoints} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
        {notes.map(note => (<div key={note.id}>
          <NoteCard note={note} handleDelete={handleDelete}/></div>))}
      </Masonry>
    </Container>
    
  )
}
