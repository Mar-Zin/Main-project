import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./loyaut/main";
import Login from "./loyaut/login";
import Users from "./loyaut/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import LoginProvider from "./hooks/useLogin";

function App() {
    return (
        <>
            <LoginProvider>
                <AuthProvider>
                    <NavBar />
                    <QualityProvider>
                        <ProfessionProvider>
                            <Switch>
                                <Route path="/" exact component={Main} />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:userId?/:edit?"
                                    component={Users}
                                />
                                <Redirect to="/" />
                            </Switch>
                        </ProfessionProvider>
                    </QualityProvider>
                </AuthProvider>
            </LoginProvider>
            <ToastContainer />
        </>
    );
}

export default App;
