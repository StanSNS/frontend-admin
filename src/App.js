import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import React from 'react'
import Admin from "./Component/Admin/Admin";
import Page404 from "./Component/Errors/Page404/Page404";
import Login from "./Component/Auth/Login";
import {isAdministrator, isUserAuthenticated} from "./Service/AuthService";

function App() {

    function Logged({element}) {
        if (isUserAuthenticated() && isAdministrator()) {
            return <Navigate to="/"/>
        }
        return element;
    }

    function NotLogged({element}) {
        if (!isUserAuthenticated() || !isAdministrator()) {
            return <Navigate to="/admin/auth/login"/>
        }
        return element;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/auth/login" element={<Logged element={<Login/>}/>}/>
                    <Route path="/" element={<NotLogged element={<Admin/>}/>}/>
                    <Route path="/page-not-found" element={<Page404/>}/>
                    <Route path="*" element={<Navigate to="/page-not-found"/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
