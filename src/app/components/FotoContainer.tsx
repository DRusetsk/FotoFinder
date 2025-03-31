import React from "react";
interface FotoContainerProps {
  setPhotoIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationID: React.Dispatch<React.SetStateAction<number>>;
  locationID: number;
  children: React.ReactNode;
}


const FotoContainer: React.FC<FotoContainerProps> = ({ setPhotoIsClicked, setLocationID, locationID, children }) => {
  return <div onClick = {() => {
    setPhotoIsClicked(true);
    setLocationID(locationID);
    console.log(locationID);
  }} className="foto-container">{children}</div>;
};

export default FotoContainer;