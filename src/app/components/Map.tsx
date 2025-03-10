'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    const customIcon = new Icon({
        iconUrl: "https://i.ibb.co/gbMZzB0z/marker-Icon.png",
        iconSize: [50, 50]
    });

    return (
        <div className = "map-container">
            <MapContainer id = "map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker icon = {customIcon} position={[51.505, -0.09]}>
                    {/* <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
                </Marker>
            </MapContainer>
        </div>
        
    );
}

