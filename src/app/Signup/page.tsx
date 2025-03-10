'use client';
import { auth } from '../firebaseconfig';   
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import NavBar from "../components/NavBar";
import '../assets/App.css';
import '../assets/Login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Page() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials);
            const user = userCredentials.user;
            updateProfile(user, {
                displayName: userName
            }).then(() => {
                console.log("Display name set successfully");
                router.push('/');
            }).catch((error) => {
                window.alert(error.message);
            });
        }).catch((error) => {
            window.alert(error.message);
        })
    };

    return (
        <div>
            <NavBar></NavBar>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <div className = "login-container">
                    <br></br> 
                    <br></br> 
                    <h2 id = 'topText'>Register</h2>
                    <br></br>
                    <form onSubmit = {handleSubmit}>
                        <div>
                            <label htmlFor = "text">
                                <strong>Username</strong>
                            </label>
                            <br></br>
                            <input
                            className = "inputFields"
                            type = "text"
                            placeholder = "Enter Username"
                            autoComplete = "off"
                            name = "username"
                            minLength = {3}
                            onChange = {(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor = "email">
                                <strong>Email</strong>
                            </label>
                            <br></br>
                            <input
                            className = "inputFields"
                            type = "email"
                            placeholder = "Enter Email"
                            autoComplete = "off"
                            name = "email"
                            minLength={3}
                            onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor = "email">
                            <strong>Password</strong>
                            </label>
                            <br></br>
                            <input
                            className = "inputFields"
                            type = "password"
                            placeholder = "Enter Password"
                            autoComplete = "off"
                            name = "password"
                            minLength = {8}
                            onChange = {(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <button id = "logButt" type = "submit" className = "buttons">
                            Register
                        </button>
                    </form>
                    <a href = "/Login">
                        <button id = "regButt" className = "buttons">Already Have an Account</button>
                    </a>
                </div>
            </div>
        </div>
    )
}