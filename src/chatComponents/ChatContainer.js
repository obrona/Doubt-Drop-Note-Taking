import React, { useEffect, useRef, useState } from 'react'
import { FaHillAvalanche, FaYoutube } from 'react-icons/fa6'
import ChatLists from './ChatLists.js'
import InputText from './InputText.js'
import UserLogin from './UserLogin.js'
import socketIOClient from 'socket.io-client'


import './style.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'

 function ChatContainer({username, module}) {
    const history = useHistory()
    const [user, setUser] = useState(username)
    const [mod, setMod] = useState(module)
    const socketio =socketIOClient('http://localhost:3000') //socketIOClient('https://chatbackend.adaptable.app/')
    const [chats, setChats] = useState([])
    
    
    useEffect(() => {
        socketio.on('chat', (chats) => {
                const correctChats = chats.filter(chat => chat.module == mod)
                setChats(correctChats)
            }
        )



        socketio.on('message', (msg) => {
            setChats(prevChats => {
                //return [...prevChats, msg]
                if (msg.module == mod) {
                    return [...prevChats, msg]
                } else {
                    return prevChats
                }
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
        socketio.emit('newMessage', newChat)
    }
    
    return (
        <div>
           
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
           
        </div>
    )
}

export default ChatContainer