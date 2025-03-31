'use client';
import React from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup, ZoomControl } from 'react-leaflet';
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MainContainerProps {
    photoCollection?: {
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

    handleMarkerClick: (lID: number) => void;
    photoIsClicked: boolean;
    locationID: number;
}

const customIcon = new Icon({
        iconUrl: "https://i.ibb.co/gbMZzB0z/marker-Icon.png",
        iconSize: [50, 50]
    });

const MapUpdater: React.FC<MainContainerProps> = ({ photoIsClicked, photoCollection = [], locationID, handleMarkerClick }) => {
    const map = useMap();

    useEffect(() => {
        if (photoIsClicked === true) {
            map.setView([photoCollection[locationID].lat, photoCollection[locationID].lng], 15, { animate: false });
        }
    }, [photoIsClicked, photoCollection.length, locationID, map]);

    return null;
}

const Map: React.FC<MainContainerProps> = ({ photoCollection = [], handleMarkerClick, photoIsClicked, locationID }) => {
    return (
        <div className = "map-container">
            <MapContainer  zoomControl = {false} id = "map" center={[43.765435, -79.467689]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <ZoomControl position = 'topright'></ZoomControl>
            <MapUpdater photoIsClicked={photoIsClicked} photoCollection={photoCollection} locationID={locationID} handleMarkerClick={handleMarkerClick}></MapUpdater>
            {photoCollection.length > 0 ? (
                photoCollection.map((photo, index) => {
                    return (
                        <Marker key = {index} icon = {customIcon} position={[photo.lat, photo.lng]} 
                            eventHandlers={{
                            click: (e) => {
                                handleMarkerClick(index);
                            }
                            }}/>
                    )
                })
            ) : (
                <></>
            )}
        </MapContainer>
        </div>
        
    );
};

export default Map;

