import React, { useContext, useState } from 'react';
import { Typography, Button, Container, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { addDoc } from "firebase/firestore";
import { db, colRef } from '../firebase.js';
import UserContext from '../UserContext.js';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formPaper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    width: '100%',
    maxWidth: 600,
    boxShadow: theme.shadows[3],
  },
  field: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(2),
    fontSize: 16,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

export default function Create() {
  const userContext = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [details, setDetails] = useState('');
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(!title);
    setDetailsError(!details);

    if (title && details) {
      try {
        await addDoc(colRef, {
          email: userContext.email,
          title,
          details,
          category
        });
        history.push('/login/notes');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Create a New Note
      </Typography>
      <Paper className={classes.formPaper}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label="Note Title"
            variant="outlined"
            error={titleError}
            required
            fullWidth
            helperText={titleError ? "Title is required" : ""}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={classes.field}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            minRows={4}
            error={detailsError}
            required
            fullWidth
            helperText={detailsError ? "Details are required" : ""}
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Note Category</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
              <FormControlLabel value="money" control={<Radio />} label="Money" />
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            className={classes.btn}
            endIcon={<KeyboardArrowRight />}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
