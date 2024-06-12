import { Paper, makeStyles, Grid, Avatar, TextField, FormControlLabel, Button, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import UserContext from "../UserContext";


const imgs = ['/dd0.png', '/dd1.png', '/dd2.png', '/dd3.png', '/dd4.png']
const len = imgs.length


export default function SignIn({login, setLogin}) {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [img, setImg] = useState(imgs[0])
    const imgIndex = useRef(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const paperStyle = {padding:20, height:'70vh', width:280, margin:'5% 0px'}
    const avatarStyle = {backgroundColor:'green'}

    useEffect(() => {
        const interval = setInterval(() => {
            imgIndex.current = (imgIndex.current + 1) % len
            setImg(imgs[imgIndex.current])
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    
    function handleLogin() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user
            if (user.emailVerified) {
                setLogin(true)
                userContext.setEmail(email)
                history.push('/login/notes')
            } else {
                alert('Email is not verified. Please check the email you sign up with for the verification email')
            }
            
        }).catch(err => {
            console.log(err.message);
            alert('Invalid credentials');
        })
    }

    function forgotPassword() {
        if (email === '') {
            alert('Please input yout email first')
        } else {
            const auth = getAuth()
            sendPasswordResetEmail(auth, email).then(() => alert('password reset link sent to email')).catch(err => console.log(err.message))
        }
    }


    return (
        <Grid  container direction="row" alignContent="center" justifyContent="center">
            <img style={{height: '70vh', width: '80vh', margin: '5% 0%'}} src={img} />
            <Paper elevation={2} style={paperStyle}>
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
                    <p style={{margin:'20px auto'}}>Not registered? <Link to='/signUp'>Sign up here</Link></p>
                </Grid>
                <Button style={{margin: '0vh 3vh'}} variant='outlined' color='secondary' onClick={forgotPassword}>Forgot Password?</Button>
            </Paper>
        </Grid>
    )
}