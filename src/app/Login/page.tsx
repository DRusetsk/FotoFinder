'use client';
import '../assets/Login.css';
import '../assets/App.css';
import NavBar from '../components/NavBar';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user
            router.push('/');
        }).catch((error) => {
            window.alert(error.message);
        })
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className = "login">
                <div className = "login-container">
                    <h2 id = "logintext">Login</h2>
                    <br></br>
                    <form onSubmit = {handleSubmit}>
                        <div>
                            <label htmlFor = "email">
                                <strong className = "labels">Email</strong>
                            </label>
                            <br></br>
                            <input
                            className = "inputFields"
                            type = "email"
                            placeholder = "Enter Email"
                            autoComplete = "off"
                            name = "email"
                            onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor = "email">
                            <strong className = "labels">Password</strong>
                            </label>
                            <br></br>
                            <input
                            className = "inputFields"
                            type = "password"
                            placeholder = "Enter Password"
                            autoComplete = "off"
                            name = "password"
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <br></br>
                        <button id = 'logButt' className = 'buttons' type = "submit">
                            Login
                        </button>
                    </form>
                    <a href = '/Signup'>
                        <button className = 'buttons' id = 'regButt'>Register</button>
                    </a>
                </div>
            </div>
        </div>
    )
}