import React, { useContext, useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from 'firebase/storage'
import { imageDb } from '../firebase'
import { Avatar } from "@material-ui/core";
import { getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { profilePicRef } from '../firebase'

import './style.css'

// functional component for the profile avatar for chat messages
function ProfileAvatar({username, hashmap}) {
    const [profileImgUrl, setProfileImgUrl] = useState()
    
    useEffect(() => {
        const url = hashmap.current.get(username)
        if (url != undefined) {
            setProfileImgUrl(url)
            return
        }
        const q = query(profilePicRef, where('email', '==', username))
        getDocs(q).then(snapshot => {
            snapshot.docs.forEach(doc => {
                const imageRef = ref(imageDb, doc.data().imageId)
                getDownloadURL(imageRef).then(url => {hashmap.current.set(username, url); setProfileImgUrl(url)})
            })
       })
   }, [])

   return <Avatar src={profileImgUrl} />
}


function SenderChat({message, username, hashmap}) {
    

    return (
        <div className='chat_sender'>
            <ProfileAvatar username={username} hashmap={hashmap} />
            <p>
                <strong>{username}</strong><br />
                {message}
            </p>
        </div>
    )
}

function SenderImage({username, imageId, hashmap}) {
    const fileRef = ref(imageDb, imageId)
    const [url, setUrl] = useState('')
    const [error, setError] = useState(false)
    
    useEffect(() => {
        getDownloadURL(fileRef).then((url) => setUrl(url)).catch(err => setError(x => !x))
    }, [error])
    
    return (
        <div className='chat_sender_image'>
            <ProfileAvatar username={username} hashmap={hashmap} />
            <p> 
                <strong>{username}</strong><br />
                <a href={url} target="_blank" rel="noopener noreferrer">Image</a>
            </p>
        </div>
    )
}

function ReceiverChat({message, username, hashmap}) {
    return (
        <div className='chat_receiver'>
            <ProfileAvatar username={username}  hashmap={hashmap} />
            <p>
                <strong>{username}</strong><br />
                {message}
            </p>
        </div>
    )
}

function ReceiverImage({username, imageId, hashmap}) {
    const fileRef = ref(imageDb, imageId)
    const [url, setUrl] = useState('')
    const [error, setError] = useState(false)
    
    useEffect(() => {
        getDownloadURL(fileRef).then((url) => setUrl(url)).catch(err => setError(x => !x))
    }, [error])
    
    return (
        <div className='chat_receiver_image'>
            <ProfileAvatar username={username} hashmap={hashmap} />
            <p>
                <strong>{username}</strong><br />
                <a href={url} target="_blank" rel="noopener noreferrer">Image</a>
            </p>
        </div>
    )
}





function ChatLists({user, chats}) {
    //const user = localStorage.getItem('user')
    const endOfMessages = useRef()
    
    const hashmap = useRef(new Map())

    useEffect(() => {
        endOfMessages.current?.scrollIntoView({behaviour: 'smooth'})
    }, [chats])
    
    return (
        <div className='chats_list'>
            {chats.map((chat, index) => {
                if (chat.username === user) {
                    return (chat.imageId === '-1') ? <SenderChat key={index} message={chat.message} username={chat.username} hashmap={hashmap} />
                        : <SenderImage key={index} username={chat.username}  imageId={chat.imageId} hashmap={hashmap} />
                } else {
                    return (chat.imageId === '-1') ? <ReceiverChat key={index} message={chat.message} username={chat.username} hashmap={hashmap} />
                        : <ReceiverImage key={index} username={chat.username}  imageId={chat.imageId} hashmap={hashmap} />
                }
            })}
            <div ref={endOfMessages} />
        </div>
    )
}

export default ChatLists