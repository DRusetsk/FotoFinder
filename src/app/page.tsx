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
          [key: string]: {url: string, metadata: {
            aperture: {
              denominator: number;
              numerator: number;
            }
            exposureTime: {
              denominator: number;
              numerator: number;
            }
            focalLength: {
              denominator: number;
              numerator: number;
            }
            iso: number;
            lensModel: string;
            model: string;
            timestamp: string;
          }}
      };
      lat: number;
      lng: number;
      locationDescription: string;
      locationName: string;
      locationAddress: string;
    };
    

    const databaseRef = dbRef(rtDB, 'locations/');
    const [photoCollection, setPhotoCollection] = useState<Photo[]>([]);
    const [photoIsClicked, setPhotoIsClicked] = useState<boolean>(false);
    const [locationID, setLocationID] = useState<number>(0);

    useEffect(() => {
        onValue(databaseRef, (snapshot) => {
            const newData: Photo[] = [];
            snapshot.forEach(childSnapShot => {
            newData.push(childSnapShot.val());
        })

        setPhotoCollection(newData);
    })
    }, []);

    const handleMarkerClick = (lID: number) => {
      setLocationID(lID);
      setPhotoIsClicked(true);
      console.log(lID);
    }


    return (
      <div>
        <NavBar/>
        <MainContainer setLocationID = {setLocationID} photoCollection={photoCollection} setPhotoIsClicked = {setPhotoIsClicked}/>
        {photoIsClicked ? (
            <div className = "photo-info-container">
              <Carousel locationID = {locationID} photoCollection = {photoCollection} />
              <h1 id='photo-title' className='text-white text-2xl font-medium'>Location Name: {photoCollection[locationID].locationName}</h1>
              <h2 id='photo-desc' className='text-white text-lg'>Description: {photoCollection[locationID].locationDescription}</h2>
              <h2 id='photo-desc' className='text-white text-m'>Address: {photoCollection[locationID].locationAddress}</h2>

              <b></b>
              <h3 id='phot-exif' className='text-white font-light mt-2'>Camera: {photoCollection[locationID].imgURLs[0].metadata.model} Focal Length: {photoCollection[locationID].imgURLs[0].metadata.focalLength.numerator}mm</h3>
              <h3 id='phot-exif' className='text-white font-light mt-2'>Aperture: f{photoCollection[locationID].imgURLs[0].metadata.aperture.numerator / photoCollection[locationID].imgURLs[0].metadata.aperture.denominator} Shutter Speed: {photoCollection[locationID].imgURLs[0].metadata.exposureTime.numerator}/{photoCollection[locationID].imgURLs[0].metadata.exposureTime.denominator} ISO:{photoCollection[locationID].imgURLs[0].metadata.iso}</h3>      
              <h3 id='phot-exif' className='text-white font-light mt-2'>Timestamp: {photoCollection[locationID].imgURLs[0].metadata.timestamp}</h3>

            </div>
        ) : (
          <></>
        )}
        <Map photoCollection = {photoCollection} handleMarkerClick={handleMarkerClick}/>
      </div>
    );
  }
