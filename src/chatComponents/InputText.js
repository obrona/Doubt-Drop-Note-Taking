import React, { useState } from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { imageDb } from '../firebase'
import { v4 } from 'uuid'

import './style.css'


function InputText({addMessage, addImage}) {
    const [message, setMessage] = useState('')
    const [img, setImg] = useState('')

    function sendMessage() {
        addMessage(message)
        setMessage('')
    }

    function uploadImage() {
        if (img === '') return
        const fileName = `DoubtDropImages/${v4()}`
        const imgRef = ref(imageDb, fileName)
        uploadBytes(imgRef, img)
        addImage(fileName)
        setImg('')
    }
    
    return (
        <div className='inputtext_container'>
            <textarea name='message' id='message' rows='6' placeholder='Inpute Message...' value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
            <button onClick={sendMessage}>Send</button>
            <br />
            <input style={{borderColor: 'red'}} type='file' accept='image/jpg, image/png, image/jpeg' onChange={e => setImg(e.target.files[0])}></input>
            <button onClick={uploadImage}>Upload Image</button>

        </div>
    )
}

export default InputText