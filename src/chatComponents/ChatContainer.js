import React, { useEffect, useRef, useState, useContext } from 'react'
import { FaHillAvalanche, FaYoutube } from 'react-icons/fa6'
import ChatLists from './ChatLists.js'
import InputText from './InputText.js'
import UserLogin from './UserLogin.js'
import socketIOClient from 'socket.io-client'


import './style.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import UserContext from '../UserContext.js'

 function ChatContainer({module}) {
    const userContext = useContext(UserContext)
    const history = useHistory()
    const [user, setUser] = useState(userContext.email)
    const [mod, setMod] = useState(module)
    const [chats, setChats] = useState([])
    const socketioRef = useRef(null);
    
    
    
    useEffect(() => {
        socketioRef.current = socketIOClient('http://localhost:3000')
        
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
        //localStorage.removeItem('user')
        //localStorage.removeItem('avatar')
        //setUser('')
        history.push('/login/chat')
    }
    
    
    
    
    function addMessage(chat) {
        const newChat = {
            username: user,
            module: mod,
            message: chat,
            avatar: localStorage.getItem('avatar')
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
                    <p className='chats_logout' style={{padding: '10px'}} onClick={Logout}>
                        <strong>Logout</strong>
                    </p>
                </div>
                <ChatLists user={user} chats={chats}/>
                <InputText addMessage={addMessage} />
            </div>
           
        </div>
    )
}

export default ChatContainer