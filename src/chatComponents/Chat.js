import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import UserLogin from "./UserLogin";
import ChatContainer from "./ChatContainer";
import { useState } from "react";


function Chat() {
    const [user, setUser] = useState('')
    const [mod, setMod] = useState(sessionStorage.getItem('chatSignInModule'))

    return ((mod != null) ?
        <ChatContainer setModule={setMod} module={mod} /> : <UserLogin setMod={setMod} />
    )
}

export default Chat