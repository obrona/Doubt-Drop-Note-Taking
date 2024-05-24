import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Quotes from './pages/Quotes'
import { Layout } from './components/Layout'
import PomodoroTimer from './timerComponents/PomodoroTimer'
import { useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'





function App() {
  const [login, setLogin] = useState(true);
  return (
    
    <BrowserRouter>
      <Route exact path='/'>
        <SignIn login={login} setLogin={setLogin}/>
      </Route>
      <Route exact path='/signUp'>
        <SignUp />
      </Route>

      <Route path='/login'>
        {(login) ? 
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
          </Switch>
        </Layout>
        : <Redirect to='/' />}
      </Route>
    </BrowserRouter>
    
  );
}

export default App;
