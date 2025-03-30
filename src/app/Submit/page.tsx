'use client';
import { useState } from 'react'
import NavBar from '../components/NavBar';
import '../assets/App.css';
import '../assets/Login.css';
import Map from '../components/Map';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import Submission from '../components/Submission';

export default function Page() {
    const [photoDescription, setPhotoDescrption] = useState<string>("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

    }

    return (
        <div className = "">
        <NavBar></NavBar>
        <br></br>
        <br></br>
        <br></br>
        <Submission></Submission>
        </div>
    )
}