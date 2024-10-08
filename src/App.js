import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Quotes from './pages/Quotes'
import { Layout } from './components/Layout'
import PomodoroTimer from './timerComponents/PomodoroTimer'
import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserContext from './UserContext'
import Chat from './chatComponents/Chat'
import ProfilePic from './profilePicComponent/profile'
import { db, profilePicRef } from './firebase'
import { getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import MyCalendar from './calendarComponents/MyCalendar'
import Calculator from './CalculatorComponents/Cal'





function App() {
  const [email, setEmail] = useState(sessionStorage.getItem('email'))
  const [login, setLogin] = useState(sessionStorage.getItem('signInSuccess'))
  const [imgUrl, setImgUrl] = useState(sessionStorage.getItem('imgUrl'))
  
  return (
    <UserContext.Provider value={{login: login, setLogin: setLogin, email: email, setEmail: setEmail, imgUrl: imgUrl, setImgUrl: setImgUrl}}>
      <BrowserRouter>
        <Route exact path='/'>
          <SignIn login={login} setLogin={setLogin}/>
        </Route>
        <Route exact path='/signUp'>
          <SignUp login={login} setLogin={setLogin}/>
        </Route>

        <Route path='/login'>
          {(login != null) ? 
          <Layout>
            <Switch>
              <Route exact path="/login/notes">
                <Notes />
              </Route>
              <Route exact path="/login/create">
                <Create />
              </Route>
              <Route exact path='/login/timer'>
                <PomodoroTimer />
              </Route>
              <Route exact path='/login/chat'>
                <Chat />
              </Route>
              <Route exact path='/login/profile'>
                <ProfilePic />
              </Route>
              <Route exact path='/login/calendar'>
                <MyCalendar />
              </Route>
              <Route exact path='/login/calculator'>
                <Calculator />
              </Route>
            </Switch>
          </Layout>
          : <Redirect to='/' />}
        </Route>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
