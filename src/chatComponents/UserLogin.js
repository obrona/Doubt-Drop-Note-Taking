import React, { useEffect, useState } from "react";
import { FaReact } from 'react-icons/fa6'
import _ from 'lodash'
import { Grid, Paper, Typography, Button, IconButton } from '@material-ui/core'
import { DeleteOutline, CheckOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { db, moduleRef } from '../firebase'
import { getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore'
import './style.css'



function Module({mod, deleteModule, selectModule}) {
    //console.log(mod.module)
    return <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Typography>{mod.module}</Typography>
        <IconButton onClick={deleteModule}>
            <DeleteOutline />
        </IconButton>
        <IconButton onClick={selectModule}>
            <CheckOutlined />
        </IconButton>
    </Grid>
}


function UserLogin({setMod}) {
    const history = useHistory()
    const [module, setModule] = useState('')
    const [mods, setMods] = useState([])
    
    function handleUser() {
        if (!module) return;
        
        if (mods.filter(mod => mod.module === module) == 0) {
            addDoc(moduleRef, {
                email: getAuth().currentUser.email,
                module: module
            })
        }
        
        setMod(module)
        localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1,1000)}/200/300`)
        history.push('/login/chat/success')
    }

    function deleteModule(id) {
        const docRef = doc(db, 'Modules', id)
        deleteDoc(docRef).then(() => setMods(mods.filter(mod => mod.id != id))).catch(error => console.log(error.message))
    }

    function selectModule(module) {
        setModule(module)
    }

    useEffect(() => {
        const modules = []
        const userEmail = getAuth().currentUser.email
        const q = query(moduleRef, where('email', '==', userEmail))
        getDocs(q).then(snapshot => {
            snapshot.docs.forEach((d) => {
                modules.push({...d.data(), id: d.id})
            })
            setMods(modules)
        })
    }, [])

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
            <Grid container direction='column' alignItems='center'>
                <Typography variant='h6'>Modules Joined Before</Typography>
                {mods.map((mod, index) => <Module key={index} mod={mod} deleteModule={() => deleteModule(mod.id)} selectModule={() => selectModule(mod.module)}/>)}
            </Grid>
        </div>
    )
}

export default UserLogin