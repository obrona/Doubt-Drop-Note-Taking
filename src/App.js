import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Quotes from './pages/Quotes'
import { Layout } from './components/Layout'
import PomodoroTimer from './timerComponents/PomodoroTimer'
import { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UserContext from './UserContext'
import Chat from './chatComponents/Chat'





function App() {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState(false)
  return (
    <UserContext.Provider value={{login: login, setLogin: setLogin, email: email, setEmail: setEmail}}>
      <BrowserRouter>
        <Route exact path='/'>
          <SignIn login={login} setLogin={setLogin}/>
        </Route>
        <Route exact path='/signUp'>
          <SignUp login={login} setLogin={setLogin}/>
        </Route>

        <Route path='/login'>
          {(true) ? 
          <Layout>
            <Switch>
              <Route exact path="/login/notes">
                <Notes />
              </Route>
              <Route exact path="/login/create">
                <Create />
              </Route>
              <Route exact path='/login/quotes'>
                <Quotes />
              </Route>
              <Route exact path='/login/timer'>
                <PomodoroTimer />
              </Route>
              <Route exact path='/login/chat'>
                <Chat />
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
