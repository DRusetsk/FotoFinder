'use client';
import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import NavBar from './components/NavBar';
import './assets/App.css'
import 'leaflet/dist/leaflet.css';
import MainContainer from './components/MainContainer';
import { ref as dbRef, onValue } from 'firebase/database';
import { rtDB } from './firebaseconfig';
import {Button} from "@/components/ui/button";
import Carousel from './components/Carousel';
import { Container } from 'lucide-react';


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
    const [carouselIndex, setCarouselIndex] = useState<number>(0);

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

    const closeWindow = () =>{
      setPhotoIsClicked(false);
      setCarouselIndex(0);
    }
    <button  className="mt-5 text-white"onClick={closeWindow}>Close</button>
    return (
      <div>
        <NavBar/>
        <MainContainer setLocationID = {setLocationID} photoCollection={photoCollection} setPhotoIsClicked = {setPhotoIsClicked} setPhotoCollection={setPhotoCollection}/>
        {photoIsClicked ? (
            <div className = "photo-info-container">
              <Carousel locationID = {locationID} photoCollection = {photoCollection} setCarouselIndex = {setCarouselIndex}/>
              <div className='pl-5 pr-5 pt-1 pb-3'>
              <h1 id='photo-title' className='text-white text-2xl font-medium'>Location Name: {photoCollection[locationID].locationName}</h1>
              <h2 id='photo-desc' className='text-white text-lg'>Description: {photoCollection[locationID].locationDescription}</h2>
              <h2 id='photo-desc' className='text-white text-m'>Location: {photoCollection[locationID].locationAddress}</h2>

              <h3 id='phot-exif' className='text-white font-light mt-2'>Camera: {photoCollection[locationID].imgURLs[carouselIndex].metadata.model} Focal Length: {photoCollection[locationID].imgURLs[carouselIndex].metadata.focalLength.numerator}mm</h3>
              <h3 id='phot-exif' className='text-white font-light'>Aperture: f{photoCollection[locationID].imgURLs[carouselIndex].metadata.aperture.numerator / photoCollection[locationID].imgURLs[carouselIndex].metadata.aperture.denominator} Shutter Speed: {photoCollection[locationID].imgURLs[carouselIndex].metadata.exposureTime.numerator}/{photoCollection[locationID].imgURLs[carouselIndex].metadata.exposureTime.denominator} ISO:{photoCollection[locationID].imgURLs[carouselIndex].metadata.iso}</h3>      
              <h3 id='phot-exif' className='text-white font-light'>Timestamp: {photoCollection[locationID].imgURLs[carouselIndex].metadata.timestamp}</h3>
              <div className='flex justify-center content-center'><Button variant="secondary" className="mt-5" onClick={closeWindow}>Close</Button></div>
              </div>
            </div>
        ) : (
          <></>
        )}
        <Map photoIsClicked = {photoIsClicked} photoCollection = {photoCollection} handleMarkerClick={handleMarkerClick} locationID={locationID}/>
      </div>
    );
  }
