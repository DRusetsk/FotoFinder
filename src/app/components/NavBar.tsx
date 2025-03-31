'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from '../firebaseconfig';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";



export default function NavBar() {
    const router = useRouter();
    const handleSignup = () => {
        router.push("/Signup");
    };
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
            <div id="header-nav" className="fixed top-0 bg-black z-100 block w-full pb-2.5 ">
                <div className="container">
                    <div className="brand flex justify-between items-center">
                        <a href="/" className="fixed text-3xl ml-44 mt-5">FotoFinder</a>
                    </div>
                    <a href="#menu" className="menu-link">
                        <span className="bar1"></span>
                        <span className="bar2"></span>
                        <span className="bar3"></span>
                    </a>

                    {authorized === undefined ? (
                        <nav id="menu" role="navigation" className="font-medium">
                            <ul>
                                <li><Button variant="secondary" onClick={handleSignup}>Sign Up</Button></li>
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