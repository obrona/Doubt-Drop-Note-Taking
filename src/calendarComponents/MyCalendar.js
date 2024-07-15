import { React, useContext, useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { makeStyles, Modal, Card, Typography, TextField, Container, Button, setRef } from '@material-ui/core';
import UserContext from '../UserContext.js'
import { db, calendarRef } from '../firebase'
import { getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore'

const customFormats = {
  dateFormat: 'YYYY-MM-DDTHH:mm', // Define your desired date format
};
const localizer = momentLocalizer(moment, customFormats);

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }, card: {
    height: '60vh',
    width: '40vh',
    backgroundColor: 'white',
    outline: 'none'
  }, field: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'block'
  }, title: {
    marginTop: '10px',
    marginBottom: '10px'
  }
})


function timestampToDate(timestamp) {
    return new Date(timestamp)
}



function MyCalendar() {
    const classes = useStyles()
    const userContext = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [refresh, setRefresh] = useState(null)

    useEffect(() => {
        const temp = []
        const q = query(calendarRef, where('email', '==', userContext.email))
        getDocs(q).then(snapshot => snapshot.docs.forEach(d => temp.push(
            {
                id: d.id,
                title: d.data().title,
                email: d.data().email,
                start: d.data().start.toDate(),
                end: d.data().end.toDate()
            
            }
        ))).then(() => setEvents(temp))
    }, [refresh])
    

    function selectSlot(slotInfo) {
        setEventTitle('')
        setSelectedDate(slotInfo.start)
        setEndDate(moment(slotInfo.start).add(1, 'hours').toDate())
        setShowModal(true)
    }

    function selectEvent(e) {
        setEvent(e)
        setEventTitle(e.title)
        setShowModal(true);
        setSelectedDate(e.start)
        setEndDate(e.end)
    }

    function addEvent() {
        if (eventTitle && selectedDate) {
            const newEvent = {
                email: userContext.email,
                title: eventTitle,
                start: selectedDate,
                end: endDate
            }
            
            addDoc(calendarRef, newEvent).then(() => setRefresh(refresh => !refresh)).then(() => {
                setEvents([...events, newEvent])
                closeModal()
            })
        }
    }

    
    function deleteEvent() {
        deleteDoc(doc(db, 'Calendar', event.id)).then(() => setRefresh(r => !r)).then(() => {
            setEvents(events.filter(e => e.title != event.title || e.start != event.start || e.end != event.end))
            closeModal()
        })  
    }

    function closeModal() {
        setEvent(null)
        setEventTitle('')
        setSelectedDate(null)
        setEndDate(null)
        setShowModal(false)
    }

    

    return (
        <div style={{height: '90vh'}}>
            <Calendar
                localizer={localizer}
                views={['month', 'week']}
                selectable={true}
                events={events}
                onSelectSlot={(slotInfo) => selectSlot(slotInfo)}
                onSelectEvent={(event) => selectEvent(event)}
                popup
            />
            <Modal className={classes.modal} open={showModal} onClose={closeModal}>
                <Container className={classes.card}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Typography style={{margin: '10px 0px 10px 0px'}} variant='h4' color='secondary'>{(event == null) ? 'Add' : 'Delete'} Event</Typography>
                    </div>
                    <form>
                        <Typography className={classes.title}>Event Title</Typography>
                        <TextField  className={classes.field} variant='outlined' fullWidth defaultValue={eventTitle} onChange={e => setEventTitle(e.target.value)}
                            disabled={event != null} />
                        <Typography className={classes.title}>Start</Typography>
                        <TextField
                            className={classes.field}
                            id="datetime-local"
                            label="Start Time"
                            type="datetime-local"
                            defaultValue={moment(selectedDate).format('YYYY-MM-DDTHH:mm')}
                            variant='outlined' 
                            fullWidth
                            onChange={e => setSelectedDate(new Date(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                            <Typography className={classes.title}>End</Typography>
                            <TextField
                                className={classes.field}
                                id="datetime-local"
                                label="End Time"
                                type="datetime-local"
                                defaultValue={moment(endDate).format('YYYY-MM-DDTHH:mm')}
                                variant='outlined' 
                                fullWidth
                                onChange={e => setEndDate(new Date(e.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                            }} />
                    </form>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                        <Button color='secondary' variant='outlined' onClick={addEvent} disabled={event != null}>Submit</Button>
                        <Button color='secondary' variant='outlined' onClick={deleteEvent} disabled={event == null}>Delete</Button>
                    </div>
                    
                </Container>
            </Modal>
            
        </div>
    )
}

export default MyCalendar