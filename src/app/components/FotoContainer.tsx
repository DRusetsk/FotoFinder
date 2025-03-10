import React from "react";
interface FotoContainerProps {
  children: React.ReactNode;
}

const FotoContainer: React.FC<FotoContainerProps> = ({ children }) => {
  return <div className="foto-container">{children}</div>;
};

export default FotoContainer;