

import Timer from './Timer'
import Settings from './Settings';
import SettingsContext from './SettingsContext';
//import './PomodoroTimer.css'
import{ useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    paddingTop: '50px',
    maxWidth: '340px',
    margin: '0 auto',
    textAlign: 'center',
  }
})

function PomodoroTimer() {
  const classes = useStyles();
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45)
  const [breakMinutes, setBreakMinutes] = useState(15)
  return (
    <main className={classes.main}>
      <div style={{marginBottom: '40px'}}>
        <Typography variant='h4' component='h1' color='textSecondary' noWrap>Pomodoro Timer</Typography>
      </div>
      
      <SettingsContext.Provider value={{
        showSettings: showSettings,
        setShowSettings: setShowSettings,
        workMinutes: workMinutes,
        breakMinutes: breakMinutes,
        setBreakMinutes: setBreakMinutes,
        setWorkMinutes: setWorkMinutes
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default PomodoroTimer;
