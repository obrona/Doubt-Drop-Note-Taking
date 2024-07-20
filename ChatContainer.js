import React, { useEffect, useRef, useState, useContext } from 'react'
import ChatLists from './ChatLists.js'
import InputText from './InputText.js'
import socketIOClient from 'socket.io-client'
import { Button } from '@material-ui/core'
import UserContext from '../UserContext.js'
import './style.css'

function ChatContainer({module, setModule}) {
    const userContext = useContext(UserContext)
    const [user, setUser] = useState(userContext.email)
    const [mod, setMod] = useState(module)
    const [chats, setChats] = useState([])
    const [transcript, setTranscript] = useState('')
    const socketioRef = useRef(null)
    const recognitionRef = useRef(null)
    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
        // Socket.io setup
        socketioRef.current = socketIOClient('https://chatbackend.adaptable.app/')
        
        socketioRef.current.on('chat', (chats) => {
            const correctChats = chats.filter(chat => chat.module === mod)
            setChats(correctChats)
        })

        socketioRef.current.on('message', (msg) => {
            setChats(prevChats => {
                if (msg.module === mod) {
                    return [...prevChats, msg]
                } else {
                    return prevChats
                }
            })
        })

        // Prevent timeout
        const preventTimeOut = setInterval(() => {
            socketioRef.current.emit('reconnect')
        }, 30000)

        // Speech recognition setup
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new webkitSpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                let newTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    newTranscript += event.results[i][0].transcript
                }
                setTranscript(newTranscript)
            }

            recognitionRef.current.onstart = () => {
                setIsRecording(true)
            }

            recognitionRef.current.onend = () => {
                setIsRecording(false)
            }
        } else {
            console.log('Your browser does not support the Web Speech API')
        }

        return () => {
            socketioRef.current.off('chat')
            socketioRef.current.off('message')
            clearInterval(preventTimeOut)
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [mod])

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

    const startRecording = () => {
        if (recognitionRef.current && !isRecording) {
            recognitionRef.current.start()
        }
    }

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop()
        }
    }

    return (
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
            <InputText addMessage={addMessage} addImage={addImage} />
            <textarea 
                value={transcript} 
                onChange={(e) => setTranscript(e.target.value)} 
                id="transcription"
                style={{width: '100%', height: '100px', marginTop: '10px'}}
            />
            <div style={{marginTop: '10px'}}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={startRecording} 
                    disabled={isRecording}
                >
                    Start Recording
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={stopRecording} 
                    disabled={!isRecording}
                    style={{marginLeft: '10px'}}
                >
                    Stop Recording
                </Button>
            </div>
        </div>
    )
}

export default ChatContainer