import FotoContainer from "./FotoContainer";
import { useState, useEffect} from 'react';
import { ref as dbRef, onValue} from 'firebase/database';
import { rtDB } from '../firebaseconfig';

interface MainContainerProps {
    photoCollection: {
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
    }[];

    setLocationID: React.Dispatch<React.SetStateAction<number>>;
    setPhotoIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContainer: React.FC<MainContainerProps> = ({ photoCollection, setPhotoIsClicked, setLocationID }) => {
    return (
        <div className = "main-container text-lg absolute h-525px w-450px mt-2 ml-2 bg-[rgb(27,27,27)] rounded-2xl z-1000 shadow-2xl">
            <br></br>
            <b className="p-4 text-white font-medium">Everyone's photos</b>
            <div id = "sub-container">
                {photoCollection.length > 0 ? (
                    photoCollection.map((photo, index) => {
                        const firstImageURL = photo.imgURLs && Object.keys(photo.imgURLs).length > 0 
                        ? photo.imgURLs['0'].url
                        : 'https://static.vecteezy.com/system/resources/thumbnails/014/628/086/small/download-icon-website-buffer-loader-a-spinning-circle-to-download-information-on-the-website-png.png';
                        return (<FotoContainer key = {index} setPhotoIsClicked = {setPhotoIsClicked} locationID = {index} setLocationID = {setLocationID}>
                            <img className = "fotoimage" src = {firstImageURL}/>
                            </FotoContainer>);
                    })
                    
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};


export default MainContainer;