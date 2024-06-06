import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import { Drawer, Typography, Button } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddCircleOutline, SubjectOutlined, AvTimerOutlined, ChatOutlined } from '@material-ui/icons'
import { AppBar, Toolbar, Avatar } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { format } from 'date-fns'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
        }
    })
)

export function Layout({ children }) {
    const userContext = useContext(UserContext)
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const menuItems = [
        {text: 'My Notes', icon: <SubjectOutlined color='secondary' />, path: '/notes'},
        {text: 'Create Note', icon: <AddCircleOutline color='secondary' />, path: '/create'},
        {text: 'Quotes', icon: <LibraryBooksIcon color='secondary' />, path: '/quotes'},
        {text: 'Timer', icon: <AvTimerOutlined color='secondary' />, path: '/timer'},
        {text: 'Chat', icon: <ChatOutlined color='secondary' />, path: '/chat'}
    ];

    function signOut() {
        userContext.setLogin(false)
        history.push('/')
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
                    <Avatar src='/dd.jpeg' className={classes.avatar} />
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{paper: classes.drawerPaper}}>
                <div>
                    <Typography variant='h5' className={classes.title}>Ninja Notes</Typography>
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