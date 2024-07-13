import { React, useContext, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { makeStyles, Modal, Card, Typography, TextField, Container, Button } from '@material-ui/core';
import UserContext from '../UserContext.js'

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



function MyCalendar() {
    const classes = useStyles()
    const userContext = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    function selectSlot(slotInfo) {
        setEventTitle('')
        setShowModal(true)
        console.log(slotInfo.start)
        setSelectedDate(slotInfo.start)
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
            setEvents([...events, newEvent])
            setShowModal(false)
            setSelectedDate(null)
            setEndDate(null)
            
        }
    }

    
    function deleteEvent() {
        setEvents((events) => events.filter(e => e !== event))
        setShowModal(false)
        setSelectedDate(null) 
        setEndDate(null)       
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
                views={['month']}
                selectable={true}
                events={events}
                onSelectSlot={(slotInfo) => selectSlot(slotInfo)}
                onSelectEvent={(event) => selectEvent(event)}
                popup
            />
            <Modal className={classes.modal} open={showModal} onClose={closeModal}>
                <Container className={classes.card}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Typography style={{margin: '10px 0px 10px 0px'}} variant='h4' color='secondary'>Add/Delete Event</Typography>
                    </div>
                    <form>
                        <Typography className={classes.title}>Event Title</Typography>
                        <TextField  className={classes.field} variant='outlined' fullWidth defaultValue={eventTitle} onChange={e => setEventTitle(e.target.value)}
                            disabled={event != null} />
                        <Typography className={classes.title}>Start</Typography>
                        <TextField
                            className={classes.field}
                            id="datetime-local"
                            label="Next appointment"
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
                                label="Next appointment"
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