import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { Layout } from './components/Layout'




function App() {
  return (
    
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
        </Switch>
      </Layout>
    </Router>
    
  );
}

export default App;
