import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import React from 'react'
import Admin from "./Component/Admin/Admin";
import Page404 from "./Component/Errors/Page404/Page404";
import Page500 from "./Component/Errors/Page500/Page500";
import Login from "./Component/Auth/Login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/admin/login" element={<Login/>}/>
                    <Route path="/" element={<Admin/>}/>
                    <Route path="/page-not-found" element={<Page404/>}/>
                    <Route path="/internal-server-error" element={<Page500/>}/>
                    <Route path="*" element={<Navigate to="/page-not-found"/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
