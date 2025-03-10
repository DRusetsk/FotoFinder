'use client';
import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import NavBar from './components/NavBar';
import './assets/App.css'
import 'leaflet/dist/leaflet.css';
import MainContainer from './components/MainContainer';
import { ref as dbRef, onValue } from 'firebase/database';
import { rtDB } from './firebaseconfig';


  export default function Home() {
    interface Photo {
      imgURLs: {
          [key: string]: string;
      };
      lat: number;
      long: number;
      photoDescription: string;
      photoID: string;
    }

    const databaseRef = dbRef(rtDB, 'photos/');
    const [photoCollection, setPhotoCollection] = useState<Photo[]>([]);

    useEffect(() => {
        onValue(databaseRef, (snapshot) => {
            const newData: Photo[] = [];
            snapshot.forEach(childSnapShot => {
            newData.push(childSnapShot.val());
        })

        setPhotoCollection(newData);
    })
    }, []);


    return (
      <div>
        <NavBar/>
        <MainContainer photoCollection={photoCollection}/>
        <Map photoCollection={photoCollection}/>
      </div>
    );
  }
