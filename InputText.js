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

    document.addEventListener('DOMContentLoaded', () => {
        const startButton = document.getElementById('start-recording');
        const stopButton = document.getElementById('stop-recording');
        const transcriptionArea = document.getElementById('message');
    
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support the Web Speech API');
            return;
        }
    
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
    
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            transcriptionArea.value=transcript;
            setMessage(transcript);          
        };
    
        recognition.onstart = () => {
            startButton.disabled = true;
            stopButton.disabled = false;
        };
    
        recognition.onend = () => {
            startButton.disabled = false;
            stopButton.disabled = true;
        };
    
        startButton.addEventListener('click', () => {
            recognition.start();
        });
    
        stopButton.addEventListener('click', () => {
            recognition.stop();
        });
    });
    
    return (<>
    
        <button id="start-recording" class='normal-btn'>Start Recording</button>
        <button id="stop-recording" class='normal-btn' disabled>Stop Recording</button>

        <div className='inputtext_container'>
            <textarea name='message' id='message' rows='6' placeholder='Inpute Message...' value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
            <button onClick={sendMessage}>Send</button>
            <br />
            <input style={{borderColor: 'red'}} type='file' accept='image/jpg, image/png, image/jpeg' onChange={e => setImg(e.target.files[0])}></input>
            <button onClick={uploadImage}>Upload Image</button>

        </div>
        </>
    )
}

export default InputText