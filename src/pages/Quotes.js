import React, { useEffect, useState } from 'react'
import { makeStyles, Grid, Paper, Container, TextField, Button, Typography } from '@material-ui/core'

import { NoteCard } from '../components/NoteCard'
import Masonry from 'react-masonry-css'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const useStyles = makeStyles({
    header: {
        display:'flex',
        marginBottom:'30px'
    },
    textfield: {
        flexGrow: 1
    }
})
export default function Quotes() {
    const classes = useStyles()
    const [quote, setQuotes] = useState('')
    const [reset, setReset] = useState(false)
    
    
    //const [reset2, setReset2] = useState(false)
    //const [insprQuote, setInsprQuote] = useState('')
    
    const getQuote = useEffect(() => {fetch('https://catfact.ninja/fact').then(response => response.json()).then(data => setQuotes(data.fact))
        .catch(error => setQuotes('loading'))
    }, [reset])

    /*const getInsprQuote = useEffect(() =>{
        fetch('https://api.quotable.io/quotes/random')
        .then(resp => resp.json())
        .then(data => setInsprQuote(data.content))
        .catch(err => console.log('error fetching inspirational quotes'))
    })*/

   

    
    return (
        <>
        <Container>
            <div className={classes.header}>
                <Typography className={classes.textfield} variant='h6' color='textPrimary'>Get a fact about cats...</Typography>
                <Button color='secondary' variant='outlined' onClick={() => setReset(!reset)}>Get another fact</Button>
            </div>
            <Typography variant='h6' color='textSecondary'>{quote}</Typography>
        </Container>
        <div style={{padding: '20px'}} />
        </>
    )
}