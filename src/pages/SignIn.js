import { Paper, makeStyles, Grid, Avatar, TextField, FormControlLabel, Button, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useContext, useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import UserContext from "../UserContext";



export default function SignIn({login, setLogin}) {
    const userContext = useContext(UserContext)
    const paperStyle = {padding:20, height:'70vh', width:280, margin:'20px auto'}
    const avatarStyle = {backgroundColor:'green'}
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function handleLogin() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user
            if (user.emailVerified) {
                setLogin(true)
                userContext.setEmail(email)
                history.push('/login/notes')
            } else {
                alert('Email is not verified')
            }
            
        }).catch(err => console.log(err.message))
        
       
    }
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h5'>Sign In</Typography>
                </Grid>
                <TextField label='Email' placeholder='Enter email' fullWidth required onChange={e => setEmail(e.target.value)}/>
                <div style={{padding:'20px'}} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={e => setPassword(e.target.value)}/>
                <div style={{padding:'20px'}} />
                <Button variant='contained' type='submit' color='primary' fullWidth onClick={handleLogin}>Sign In</Button>
                <Grid align='center'>
                    <p style={{margin:'20px auto'}}>Not registered <Link to='/signUp'>Sign up here</Link></p>
                </Grid>
                
                
            </Paper>
        </Grid>
    )
}