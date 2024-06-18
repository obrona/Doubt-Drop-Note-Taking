import { Paper, makeStyles, Grid, Avatar, TextField, FormControlLabel, Button, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase.js'
import { useState, useEffect, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const imgs = ['/dd0.png', '/dd1.png', '/dd2.png', '/dd3.png', '/dd4.png']
const len = imgs.length

export default function SignUp({login, setLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validCreds, setValidCreds] = useState(true)
    const history = useHistory()
    const [img, setImg] = useState(imgs[0])
    const imgIndex = useRef(0)
    const [errorMessage, setErrorMessage] = useState(null)
    
    const paperStyle = {padding:20, height:'70vh', width:280, margin:'5% 0%'}
    const avatarStyle = {backgroundColor:'green'}
    
    useEffect(() => {
        const interval = setInterval(() => {
            imgIndex.current = (imgIndex.current + 1) % len
            setImg(imgs[imgIndex.current])
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    
    function signUp() {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            sendEmailVerification(auth.currentUser);
            alert('Email verification sent. Please check your email for the verification, then go to sign in and log in with your account')
        }).catch(err => {
            setErrorMessage(err.message)
        })
    }

    
    return (
        <Grid container direction="row" alignContent="center" justifyContent="center">
            <img style={{height: '70vh', width: '80vh', margin: '5% 0%'}} src={img} />
            <Paper elevation={2} style={paperStyle}>
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
                    <p style={{margin:'20px auto'}}>Registered? <Link to='/'>Sign in here</Link></p>
                </Grid>
                <Grid align='center'>
                    <Typography color='secondary'>{errorMessage}</Typography>
                </Grid>
                
            </Paper>
        </Grid>
    )
}