import React, { useState } from "react";
import { FaReact } from 'react-icons/fa6'
import _ from 'lodash'

import './style.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserLogin({setMod}) {
    const history = useHistory()
    const [module, setModule] = useState('')
    const handleUser = () => {
        if (!module) return;
        setMod(module)
        localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1,1000)}/200/300`)
        history.push('/login/chat/success')
    }
    return (
        <div className='login_container'>
            <div className='login_title'>
                <FaReact className='login_icon'/>
                <h1>Chat App</h1>
            </div>
            <div className='login_form'>
                <input type='text' placeholder='Enter the module you want to join' value={module} onChange={(e) => setModule(e.target.value)} />
                <button onClick={handleUser}>Login</button>
            </div>
        </div>
    )
}

export default UserLogin