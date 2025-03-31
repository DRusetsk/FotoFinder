'use client';
import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import NavBar from './components/NavBar';
import './assets/App.css'
import 'leaflet/dist/leaflet.css';
import MainContainer from './components/MainContainer';
import { ref as dbRef, onValue } from 'firebase/database';
import { rtDB } from './firebaseconfig';

import Carousel from './components/Carousel';


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
    const [photoIsClicked, setPhotoIsClicked] = useState<boolean>(false);

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
        <MainContainer photoCollection={photoCollection} setPhotoIsClicked = {setPhotoIsClicked}/>
        {photoIsClicked ? (
            <div className = "photo-info-container">
              <Carousel />
              <h1 id='photo-title' className='text-white text-2xl font-medium'>Lakeside</h1>
              <h2 id='photo-desc' className='text-white text-lg'>This is an example description of the lakeside photo</h2>
              <b></b>
              <h3 id='phot-exif' className='text-white font-light mt-2'>Lens: EF 50mm f1/8, iso:200, Shutter: 1/1000</h3>
            </div>
        ) : (
          <></>
        )}
        <Map photoCollection={photoCollection}/>
      </div>
    );
  }
