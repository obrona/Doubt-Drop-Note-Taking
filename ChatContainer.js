import React, { useEffect, useRef, useState, useContext } from 'react'
import ChatLists from './ChatLists.js'
import InputText from './InputText.js'
import UserLogin from './UserLogin.js'
import socketIOClient from 'socket.io-client'
import { ref, uploadBytes } from 'firebase/storage'
import { imageDb } from '../firebase'
import { v4 } from 'uuid'



import './style.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import UserContext from '../UserContext.js'
import { Button } from '@material-ui/core'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function ChatContainer({module, setModule}) {
    const userContext = useContext(UserContext)
    const [user, setUser] = useState(userContext.email)
    const [mod, setMod] = useState(module)
    const [chats, setChats] = useState([])
    // why useRef, so that when the component rerenders, it wont try to connect to the url api again
    const socketioRef = useRef(null);
    
    
    
    useEffect(() => {
        socketioRef.current = socketIOClient('https://chatbackend.adaptable.app/')   //socketIOClient('http://localhost:3000')
             
        socketioRef.current.on('chat', (chats) => {
                const correctChats = chats.filter(chat => chat.module === mod)
                setChats(correctChats)
            }
        )

        socketioRef.current.on('message', (msg) => {
            setChats(prevChats => {
                //return [...prevChats, msg]
                if (msg.module === mod) {
                    return [...prevChats, msg]
                } else {
                    return prevChats
                }
            })
        })

        // dk why, but need to do this to prevent timeout which will cause a lot of erros
        const preventTimeOut = setInterval(() => {
            socketioRef.current.emit('reconnect')
        }, 30000);

        return () => {
            socketioRef.current.off('chat')
            socketioRef.current.off('message')
            clearInterval(preventTimeOut)
        }
    }, [])
    
    /*function sendToSocket(chat) {
        socketio.emit('chat', chat)
    }*/
    
    function Logout() {
        sessionStorage.removeItem('chatSignInModule')
        setModule(null)
    }

    function addImage(fileName) {
        const newChat = {
            username: user,
            module: mod,
            message: "",
            imageId: fileName
        }
        socketioRef.current.emit('newMessage', newChat)
    }
    
    function addMessage(chat) {
        const newChat = {
            username: user,
            module: mod,
            message: chat,
            imageId: "-1"
        }
        socketioRef.current.emit('newMessage', newChat)
    }
    return (
        <div>
            
            <div>
                <div className='chats_header'>
                    <div>
                        <h4 style={{padding: '5px'}}>Username: {user}</h4>
                        <h4 style={{padding: '5px'}}>Module: {mod}</h4>
                    </div>
                    <Button variant='outlined' color='secondary' className='chats_logout' style={{padding: '10px'}} onClick={Logout}>
                        <strong>Logout</strong>
                    </Button>
                </div>
                <ChatLists user={user} chats={chats} />
                <InputText addMessage={addMessage} addImage={addImage}/>

            </div>
       
           
        </div>
    )
}

export default ChatContainer