import FotoContainer from "./FotoContainer";
import { useState, useEffect} from 'react';
import { getDatabase, ref as dbRef, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { rtDB } from '../firebaseconfig';
import FilterDropdown from "@/app/components/Filter";

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
    setPhotoCollection: React.Dispatch<React.SetStateAction<Photo[]>>;
    setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
};

type Filter = 'All' | 'Urban' | 'Wildlife' | 'Sports' | 'Nature';


const MainContainer: React.FC<MainContainerProps> = ({ photoCollection, setPhotoCollection, setPhotoIsClicked, setLocationID, setCarouselIndex }) => {
    const [selectedFilter, setSelectedFilter] = useState<Filter>('All');
    const rtDB = getDatabase();
    const filterCallback = (filter: Filter) => {
        const databaseRef = dbRef(rtDB, 'locations/'); 
        const locationQuery = query(databaseRef, orderByChild('tag'), equalTo(filter));
        if (filter === 'All') {
            onValue(databaseRef, (snapshot) => {
                const newData: Photo[] = [];
                snapshot.forEach(childSnapShot => {
                    newData.push(childSnapShot.val());
                })
            
                setPhotoCollection(newData);
                setLocationID(0);
            });
        } else {
            get(locationQuery).then((snapshot) => {
                if (snapshot.exists() && snapshot.hasChildren()) {
                    const newData: Photo[] = [];
                    snapshot.forEach(childSnapShot => {
                        newData.push(childSnapShot.val());
                    });
                    
                    setLocationID(0);
                    setPhotoCollection(newData);
                } else {
                    setPhotoCollection([]);
                }
            });
        }
    };

    return (
        <div className = "main-container text-lg absolute h-auto w-450px mt-1 ml-2 bg-[rgb(27,27,27)] rounded-2xl z-1000 shadow-2xl">
            <div className="pl-3 pr-2 pt-5 flex justify-between">
                <b className=" text-white font-medium">Everyone's photos</b>
                <FilterDropdown selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} filterCallback={filterCallback}/>
            </div>

            <div id = "sub-container">
                {photoCollection.length > 0 ? (
                    photoCollection.map((photo, index) => {
                        const firstImageURL = photo.imgURLs && Object.keys(photo.imgURLs).length > 0 
                        ? photo.imgURLs['0'].url
                        : 'https://static.vecteezy.com/system/resources/thumbnails/014/628/086/small/download-icon-website-buffer-loader-a-spinning-circle-to-download-information-on-the-website-png.png';
                        return (<FotoContainer key = {index} setPhotoIsClicked = {setPhotoIsClicked} locationID = {index} setLocationID = {setLocationID} setCarouselIndex = {setCarouselIndex}>
                            <img className = "fotoimage" src = {firstImageURL}/>
                            </FotoContainer>);
                    })
                    
                ) : (
                    <>
                        <b className = "text-white w-80">No results with specified filter!</b>
                    </>
                )}
            </div>
        </div>
    );
};


export default MainContainer;