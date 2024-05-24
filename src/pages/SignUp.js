import { Paper, makeStyles, Grid, Avatar, TextField, FormControlLabel, Button, Typography } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link } from 'react-router-dom'


export default function SignUp() {
    const paperStyle = {padding:20, height:'70vh', width:280, margin:'20px auto'}
    const avatarStyle = {backgroundColor:'green'}
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant='h5'>Sign In</Typography>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <div style={{padding:'20px'}} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <div style={{padding:'20px'}} />
                <Button variant='contained' type='submit' color='primary' fullWidth>Sign Up</Button>
                <Grid align='center'>
                    <p style={{margin:'20px auto'}}>Registered <Link to='/'>Sign in here</Link></p>
                </Grid>
                
                
            </Paper>
        </Grid>
    )
}