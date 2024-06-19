import ReactSlider from 'react-slider'
import './slider.css'
import { useContext } from 'react'
import SettingsContext from './SettingsContext'
import { BackButton } from './Buttons'
import { makeStyles } from '@material-ui/core'





function Settings() {
    //const classes = useStyles();
    const settingsInfo = useContext(SettingsContext)
    return (
        <div style={{textAlign:'left'}}>
            <label style={{fontSize:'25px'}}>work: {settingsInfo.workMinutes}:00</label>
            <ReactSlider className={'slider'} thumbClassName={'thumb'} 
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={0}
                max={120}
            />
            <div style={{padding:'10px'}}></div>
            <label style={{fontSize:'25px'}}>break {settingsInfo.breakMinutes}:00</label>
            <ReactSlider className={'slider green'} thumbClassName={'thumb'} 
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={0}
                max={120}
            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>
    )
}

export default Settings