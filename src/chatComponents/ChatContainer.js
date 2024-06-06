import React, { useEffect, useRef, useState } from 'react'
import { FaHillAvalanche, FaYoutube } from 'react-icons/fa6'
import ChatLists from './ChatLists.js'
import InputText from './InputText.js'
import UserLogin from './UserLogin.js'
import socketIOClient from 'socket.io-client'

import './style.css'

 function ChatContainer() {
    const [user, setUser] = useState('')
    const [mod, setMod] = useState('')
    const socketio = socketIOClient('https://chatbackend.adaptable.app/')
    const [chats, setChats] = useState([])
    
    
    useEffect(() => {
        socketio.on('chat', (chats) => {
                //const correctChats = chats.filter(chat => chat.module == mod)
                setChats(chats)
            }
        )



        socketio.on('message', (msg) => {
            console.log('new message' + msg.username + " " + msg.module)
            
            setChats(prevChats => {
                return [...prevChats, msg]
                /*if (msg.module == mod) {
                    return [...prevChats, msg]
                } else {
                    return prevChats
                }*/
            })
        })

        return () => {
            socketio.off('chat')
            socketio.off('message')
        }
    }, [])
    
    function sendToSocket(chat) {
        socketio.emit('chat', chat)
    }
    
    function Logout() {
        //localStorage.removeItem('user')
        //localStorage.removeItem('avatar')
        setUser('')
    }
    
    
    
    
    function addMessage(chat) {
        const newChat = {
            username: user,
            module: mod,
            message: chat,
            avatar: localStorage.getItem('avatar')
        }
        
        socketio.emit('newMessage', newChat)
        
    }
    
    return (
        <div>
            {(user) ? (
                <div>
                <div className='chats_header'>
                    <div>
                        <h4 style={{padding: '5px'}}>Username: {user}</h4>
                        <h4 style={{padding: '5px'}}>Module: {mod}</h4>
                    </div>
                    <p><FaYoutube className='chats_icon' /></p>
                    <p className='chats_logout' style={{padding: '10px'}} onClick={Logout}>
                        <strong>Logout</strong>
                    </p>
                </div>
                <ChatLists user={user} chats={chats}/>
                <InputText addMessage={addMessage} />
                </div>
            ) : <UserLogin setUser={setUser} setMod={setMod} />}
        </div>
    )
}

export default ChatContainer