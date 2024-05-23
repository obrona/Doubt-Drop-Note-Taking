import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Quotes from './pages/Quotes'
import { Layout } from './components/Layout'
import PomodoroTimer from './timerComponents/PomodoroTimer'





function App() {
  return (
    
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path='/quotes'>
            <Quotes />
          </Route>
          <Route exact path='/timer'>
            <PomodoroTimer />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
