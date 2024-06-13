import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from 'firebase/storage'
import { imageDb } from '../firebase'
import { Avatar } from "@material-ui/core";

import './style.css'

function SenderChat({message, username}) {
    return (
        <div className='chat_sender'>
            <Avatar></Avatar>
            <p>
                <strong>{username}</strong><br />
                {message}
            </p>
        </div>
    )
}

function SenderImage({username, imageId}) {
    console.log(imageId)
    const fileRef = ref(imageDb, imageId)
    const [url, setUrl] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        getDownloadURL(fileRef).then((url) => setUrl(url)).catch(err => setError(x => !x))
    }, [error])
    
    return (
        <div className='chat_sender_image'>
            <Avatar></Avatar>
            <p>
                <strong>{username}</strong><br />
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </p>
        </div>
    )
}

function ReceiverChat({message, username}) {
    return (
        <div className='chat_receiver'>
            <Avatar></Avatar>
            <p>
                <strong>{username}</strong><br />
                {message}
            </p>
        </div>
    )
}

function ReceiverImage({username, imageId}) {
    const fileRef = ref(imageDb, imageId)
    const [url, setUrl] = useState('')
    const [error, setError] = useState(false)
    
    useEffect(() => {
        getDownloadURL(fileRef).then((url) => setUrl(url)).catch(err => setError(x => !x))
    }, [error])
    
    return (
        <div className='chat_receiver_image'>
            <Avatar></Avatar>
            <p>
                <strong>{username}</strong><br />
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </p>
        </div>
    )
}





function ChatLists({user, chats}) {
    //const user = localStorage.getItem('user')
    const endOfMessages = useRef()
    
    useEffect(() => {
        endOfMessages.current?.scrollIntoView({behaviour: 'smooth'})
    }, [chats])
    
    return (
        <div className='chats_list'>
            {chats.map((chat, index) => {
                if (chat.username === user) {
                    return (chat.imageId === '-1') ? <SenderChat key={index} message={chat.message} username={chat.username}  />
                        : <SenderImage key={index} username={chat.username}  imageId={chat.imageId} />
                } else {
                    return (chat.imageId === '-1') ? <ReceiverChat key={index} message={chat.message} username={chat.username}  />
                        : <ReceiverImage key={index} username={chat.username}  imageId={chat.imageId} />
                }
            })}
            <div ref={endOfMessages} />
        </div>
    )
}

export default ChatLists