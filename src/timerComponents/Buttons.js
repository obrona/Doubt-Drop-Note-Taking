import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    button: {
        backgroundColor: 'transparent',
        color: 'black',
        border: '0',
        display: 'inline-block',
        width: '100px',
        cursor: 'pointer',
    },
    buttonWithText: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '1.4rem',
        lineHeight: '36px',

    },
    buttonWithTextSvg: {
        width: '36px',
        float: 'left',
        marginRight: '5px'
    }
})


export function BackButton(props) {
  const classes = useStyles();
  return (
    <button {...props} className={classes.buttonWithText}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
      </svg>
      Back
    </button>
  );
}


export function PauseButton(props) {
    const classes = useStyles();
    return (
        <button {...props} className={classes.button}>
        <svg xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        </button>
    );
}


export function PlayButton(props) {
  const classes = useStyles();
  return (
    <button {...props} className={classes.button}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    </button>
  );
}


export function SettingsButton(props) {
  const classes = useStyles();
  return (
    <button {...props} className={classes.buttonWithText}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>

      Settings
    </button>
  );
}