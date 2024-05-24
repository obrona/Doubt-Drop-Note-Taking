import React, { useState } from 'react'
import { Typography, Button, ButtonGroup, Container } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    background: 'violet'
  }, field: {
    marginTop: 40,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [details, setDetails] = useState('');
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');

  function handleSubmit(e) {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title == '') {
      setTitleError(true);
    }
    if (details == '') {
      setDetailsError(true);
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', 
        {method: 'POST', header: {'Content type': 'application/json'}, body: JSON.stringify({title, details, category})}).then(() => history.push('/login/notes'));
    }
  }
  
  return (
    <Container>
      <Typography variant='h6' color='textSecondary' component='h2' gutterBottom >Create a new Note</Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField onChange={(e) => setTitle(e.target.value)} className={classes.field} label='Note Title' variant='outlined' error={titleError} required fullWidth/>
        <TextField onChange={(e) => setDetails(e.target.value)} className={classes.field} label='Details'  variant='outlined' color='secondary' multiline minRows={4} error={detailsError} required fullWidth />
        
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio />} label='Money' />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel value='reminder' control={<Radio />} label='Reminder' />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
          </RadioGroup>
        </FormControl>
        <Button type='submit' color='secondary' variant='contained' onClick={()=>console.log("you click me")} endIcon={<KeyboardArrowRight />}>Submit</Button>
      </form>
      
      <br />
    </Container>
  )
}
