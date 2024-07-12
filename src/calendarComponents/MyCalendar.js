import { React, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { makeStyles, Modal, Card, Typography, TextField, Container, Button } from '@material-ui/core';


const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }, card: {
    height: '30vh',
    width: '40vh',
    backgroundColor: 'white',
    outline: 'none'
  }, field: {
    marginTop: '10',
    marginBottom: '10',
    display: 'block'
  }
})


function MyCalendar() {
    const classes = useStyles()
    const [showModal, setShowModal] = useState(false)
    const [events, setEvents] = useState([])
    const [eventTitle, setEventTitle] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)

    function selectSlot(slotInfo) {
        setShowModal(true)
        setSelectedDate(slotInfo.start)
    }

    function addEvent() {
        if (eventTitle && selectedDate) {
            const newEvent = {
                title: eventTitle,
                start: selectedDate,
                end: moment(selectedDate).add(1, 'hours').toDate()
            }
            setEvents([...events, newEvent])
            setShowModal(false)
        }
    }
    return (
        <div style={{height: '90vh'}}>
            <Calendar
                localizer={localizer}
                views={['month']}
                selectable={true}
                events={events}
                onSelectSlot={(slotInfo) => selectSlot(slotInfo)}
            />
            <Modal className={classes.modal} open={showModal} onClose={() => setShowModal(false)}>
                <Container className={classes.card}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Typography style={{margin: '10px 0px 10px 0px'}} variant='h4' color='secondary'>Add Event</Typography>
                    </div>
                    <Typography style={{marginBottom: '10px'}}>Event Title</Typography>
                    <TextField style={{marginBottom: '10px'}} className={classes.field} variant='outlined' fullWidth onChange={e => setEventTitle(e.target.value)}/>
                     <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button color='secondary' variant='outlined' onClick={addEvent}>Submit</Button>
                    </div>
                    
                </Container>
            </Modal>
            
        </div>
    )
}

export default MyCalendar