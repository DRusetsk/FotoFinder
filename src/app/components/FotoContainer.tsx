import React from "react";
interface FotoContainerProps {
  setPhotoIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}


const FotoContainer: React.FC<FotoContainerProps> = ({ setPhotoIsClicked, children }) => {
  return <div onClick = {() => {
    setPhotoIsClicked(true);
  }} className="foto-container">{children}</div>;
};

export default FotoContainer;