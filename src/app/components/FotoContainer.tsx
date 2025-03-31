import React from "react";
interface FotoContainerProps {
  setPhotoIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationID: React.Dispatch<React.SetStateAction<number>>;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  locationID: number;
  children: React.ReactNode;
}


const FotoContainer: React.FC<FotoContainerProps> = ({ setPhotoIsClicked, setLocationID, setCarouselIndex, locationID, children }) => {
  return <div onClick = {() => {
    setPhotoIsClicked(true);
    setLocationID(locationID);
    setCarouselIndex(0);
    console.log(locationID);
  }} className="foto-container">{children}</div>;
};

export default FotoContainer;