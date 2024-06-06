import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import UserLogin from "./UserLogin";
import ChatContainer from "./ChatContainer";
import { useState } from "react";


function Chat() {
    const [user, setUser] = useState('')
    const [mod, setMod] = useState('')
    return (<BrowserRouter>
        <Switch>
            <Route exact path='/login/chat'>
                <UserLogin setUser={setUser} setMod={setMod} />
            </Route>
            <Route exact path='/login/chat/success'>
                <ChatContainer username={user} module={mod}/>
            </Route>

        </Switch>
    </BrowserRouter>)
}

export default Chat