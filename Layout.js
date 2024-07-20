import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { Drawer, Typography, Button } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddCircleOutline, SubjectOutlined, AvTimerOutlined, ChatOutlined, AccountCircleOutlined, CalendarTodayOutlined } from '@material-ui/icons'

import { AppBar, Toolbar, Avatar } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'

import UserContext from '../UserContext'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => (
    {   
        page: {
            background: 'white',
            width: '100%',
            padding: theme.spacing(3)
        }, drawer: {
            width: drawerWidth,
        }, drawerPaper: {
            width: drawerWidth
        }, root: {
            display: 'flex'
        }, active: {
            background: '#f4f4f4'
        }, title: {
            padding: theme.spacing(2)
        }, appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        }, toolbar: {
            padding: '40px'
        }, date: {
            flexGrow: 1
        }, avatar: {
            marginLeft: theme.spacing(2)
        },dark:{
            background: "#333b3c",
            color: "#efefec"
        }
        ,light :{
            background: "#efefec",
            color: "#333b3c"
        }
    })
)

export function Layout({ children }) {
    const userContext = useContext(UserContext)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const menuItems = [
        {text: 'Notes', icon: <SubjectOutlined color='secondary' />, path: '/notes'},
        {text: 'Create Note', icon: <AddCircleOutline color='secondary' />, path: '/create'},
        {text: 'Pomodoro Timer', icon: <AvTimerOutlined color='secondary' />, path: '/timer'},
        {text: 'Chat', icon: <ChatOutlined color='secondary' />, path: '/chat'},
        {text: 'Calendar', icon: <CalendarTodayOutlined color='secondary' />, path: '/calendar'},
        {text: 'Profile', icon: <AccountCircleOutlined color='secondary' />, path: '/profile'}
    ];

    function signOut() {
        userContext.setLogin(false)
        sessionStorage.clear()
        history.push('/')
    }
     // change a text in button 


let currmode = "light";
let body = document.querySelector("body");
const root = document.querySelector(".MuiPaper-root")
console.log(root)
// console.log(modeBtn)
// modeBtn.addEventListener("click" , () =>{
//     // console.log("you are trying to change mode");
//     if (currmode == "light"){
//         currmode = "dark";
//         body.classList.add("dark");
//         body.classList.remove("light")
//     } else {
//         currmode = "light";
//         body.classList.add("light");
//         body.classList.remove("dark");
//     }

//     console.log(currmode)
// })
 
function change(e){
    // console.log("you are trying to change mode");
    console.log(root)
    if (currmode == "light"){
        currmode = "dark";
        body.classList.add("dark");
        body.classList.remove("light")
        root.classList.remove(classes.light)
        root.classList.add(classes.dark)
    } else {
        currmode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        root.classList.remove(classes.dark)
        root.classList.add(classes.light)
    }

    

    console.log(currmode)
}

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0} color='default'>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is {format(new Date(), 'do MMMM y')}
                    </Typography>
                    <Typography>
                        {userContext.email}
                    </Typography>
                    <Avatar src={userContext.imgUrl} className={classes.avatar} />
                    <Button onClick={() => signOut()}>Sign Out</Button>
                    <button onClick={(e) => change(e)} id="btn">🌙</button>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{paper: classes.drawerPaper}}>
                <div>
                    <Typography variant='h5' className={classes.title}>Doubt Drop</Typography>
                </div>
                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} button onClick={() => history.push('/login' + item.path)} className={(location.pathname == item.path) ? classes.active : null}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}