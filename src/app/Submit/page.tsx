'use client';
import { useState } from 'react'
import NavBar from '../components/NavBar';
import '../assets/App.css';
import '../assets/Login.css';
import Map from '../components/Map';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

export default function Page() {
    const [photoDescription, setPhotoDescrption] = useState<string>("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

    }

    return (
        <>
        <NavBar></NavBar>

        <div className = "login-container">
            <br></br>
            <br></br> 
            <br></br> 
            <br></br>
            <br></br> 
            <br></br> 
            <br></br>
            <br></br> 
            <br></br> 
            <br></br>
            <br></br> 
            <br></br> 
            <br></br>   
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor = "text">
                        <strong>Photo Description</strong>
                    </label>
                    <br></br>
                    <input
                    className = "inputFields"
                    type = "text"
                    placeholder = "Enter Photo Description"
                    autoComplete = "off"
                    name = "description"
                    minLength = {3}
                    onChange = {(e) => setPhotoDescrption(e.target.value)}
                    />
                </div>
                <br></br>
                <button id = "logButt" type = "submit" className = "buttons">
                    Register
                </button>
            </form>
            </div>
        </>
    )
}