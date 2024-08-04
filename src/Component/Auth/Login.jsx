import React, {useState} from 'react'
import './Login.css'
import {Button} from "react-bootstrap";
import {authenticateUser} from "../../Service/AuthService";

function Login() {
    const [isLoginCardVisible, setIsLoginCardVisible] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleToggleChange = () => {
        setIsLoginCardVisible(!isLoginCardVisible);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        const data = {
            username: user,
            password: password
        };
        await authenticateUser(data)
    };

    return (
        <>
            <div className="d-flex justify-content-end">
                <label className="switch">
                    <input type="checkbox" onChange={handleToggleChange} defaultChecked={false}/>
                    <span className="slider"></span>
                </label>
            </div>

            <div className="loginContainer">
                {isLoginCardVisible && (
                    <div className="loginCard">
                        <div className="group">
                            <svg stroke="currentColor"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="icon">
                                <path
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                >
                                </path>
                            </svg>
                            <input
                                className="input"
                                type="password"
                                value={user}
                                onChange={handleUserChange}
                                required
                                disabled={!isLoginCardVisible}
                            />
                        </div>
                        <div className="group">
                            <svg stroke="currentColor"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="icon">
                                <path
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                >
                                </path>
                            </svg>
                            <input
                                className="input"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                disabled={!isLoginCardVisible}
                            />
                        </div>
                        <Button variant="dark" onClick={handleSubmit}>Submit</Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;
