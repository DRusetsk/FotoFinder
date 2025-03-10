'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup, ZoomControl } from 'react-leaflet';
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MainContainerProps {
    photoCollection?: {
        imgURLs: {
            [key: string]: string;
        };
        lat: number;
        long: number;
        photoDescription: string;
        photoID: string;
    }[];
}

const customIcon = new Icon({
        iconUrl: "https://i.ibb.co/gbMZzB0z/marker-Icon.png",
        iconSize: [50, 50]
    });


const Map: React.FC<MainContainerProps> = ({ photoCollection = [] }) => {
    return (
        <div className = "map-container">
            <MapContainer  zoomControl = {false} id = "map" center={[43.765435, -79.467689]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <ZoomControl position = 'topright'></ZoomControl>
                {photoCollection.length > 0 ? (
                    photoCollection.map((photo) => {
                        return (
                            <Marker icon = {customIcon} position={[photo.lat, photo.long]}/>
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

