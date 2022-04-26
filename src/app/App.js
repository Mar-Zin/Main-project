import React from "react";
import NavBar from "./components/navBar";
import { Route } from "react-router-dom";
import Main from "./loyaut/main";
import Login from "./loyaut/login";
import Users from "./loyaut/users";

function App() {
    return (
        <>
            <NavBar />
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
        </>
    );
}

export default App;
