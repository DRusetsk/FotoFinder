'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from '../firebaseconfig';

export default function NavBar() {
    const [authorized, setAuthorized] = useState<User>();
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthorized(user);
                console.log(user);
            }

            return () => {
                listen();
            }
        })
    }, [onAuthStateChanged]);

    const logout = () => {
        signOut(auth).then(() => {
            console.log('Sign out successful.')
            setAuthorized(undefined);
        });
    }

    return (
        <div>
            <div id="header-nav">
                <div className="container">
                    <div className="brand">
                        <a href="/"><h1>FotoFinder</h1></a>
                    </div>
                    <a href="#menu" className="menu-link">
                        <span className="bar1"></span>
                        <span className="bar2"></span>
                        <span className="bar3"></span>
                    </a>

                    {authorized === undefined ? (
                        <nav id="menu" role="navigation">
                            <ul>
                                <li><a href="/Signup">Signup</a></li>
                                <li><a></a></li>
                                <li><a href="/Login">Login</a></li>
                            </ul>
                        </nav>
                    ) : (
                        <nav id="menu" role="navigation">
                            <ul>
                                <li><a href = "/Submit">Submit</a></li>
                                <li><a></a></li>
                                <li><a>Signed in as {authorized.displayName}</a></li>
                                <li><a></a></li>
                                <li><a href = "/" onClick={logout}>Logout</a></li>
                            </ul>
                        </nav>
                    )}
                    
                </div>
            </div>
        </div>
    );
}