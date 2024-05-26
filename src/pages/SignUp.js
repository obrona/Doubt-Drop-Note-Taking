import { Paper, makeStyles, Grid, Avatar, TextField, FormControlLabel, Button, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase.js'
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";



export default function SignUp({login, setLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validCreds, setValidCreds] = useState(true)
    const history = useHistory()
    
    const paperStyle = {padding:20, height:'70vh', width:280, margin:'20px auto'}
    const avatarStyle = {backgroundColor:'green'}
    
    
    function signUp() {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            sendEmailVerification(auth.currentUser);
            alert('Email verification sent')
        }).catch(err => setValidCreds(false))
    }

    
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h5'>Sign Up</Typography>
                </Grid>
                <TextField label='Email' placeholder='Enter username' fullWidth required onChange={e => setEmail(e.target.value)}/>
                <div style={{padding:'20px'}} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={e => setPassword(e.target.value)}/>
                <div style={{padding:'20px'}} />
                <Button variant='contained' type='submit' color='primary' fullWidth onClick={signUp}>Sign Up</Button>
                <Grid align='center'>
                    <p style={{margin:'20px auto'}}>Registered <Link to='/'>Sign in here</Link></p>
                </Grid>
                {(validCreds) ? null : 
                    <Grid align='center'>
                        <p>Invalid email and/or password. Please try again</p>
                    </Grid>
                }
                
                
            </Paper>
        </Grid>
    )
}