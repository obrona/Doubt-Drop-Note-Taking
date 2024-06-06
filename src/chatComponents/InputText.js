import React, { useState } from 'react'

import './style.css'

function InputText({addMessage}) {
    const [message, setMessage] = useState('')

    function sendMessage() {
        addMessage(message)
        setMessage('')
    }
    
    return (
        <div className='inputtext_container'>
            <textarea name='message' id='message' rows='6' placeholder='Inpute Message...' value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default InputText