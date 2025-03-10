import FotoContainer from "./FotoContainer";
import { useState, useEffect} from 'react';
import { ref as dbRef, onValue} from 'firebase/database';
import { rtDB } from '../firebaseconfig';

interface MainContainerProps {
    photoCollection: {
        imgURLs: {
        [key: string]: string;
        };
        lat: number;
        long: number;
        photoDescription: string;
        photoID: string;
    }[];

    setPhotoIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContainer: React.FC<MainContainerProps> = ({ photoCollection, setPhotoIsClicked }) => {
    return (
        <div className = "main-container">
            <br></br>
            <b style = {{padding: "25px"}}>Everyone's photos</b>
            <div id = "sub-container">
                {photoCollection.length > 0 ? (
                    photoCollection.map((photo) => {
                        console.log(photoCollection);
                        const firstImageURL = photo.imgURLs && Object.keys(photo.imgURLs).length > 0 
                        ? photo.imgURLs['1']
                        : 'https://static.vecteezy.com/system/resources/thumbnails/014/628/086/small/download-icon-website-buffer-loader-a-spinning-circle-to-download-information-on-the-website-png.png';
                        return (<FotoContainer key = {photo.photoID} setPhotoIsClicked = {setPhotoIsClicked}>
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