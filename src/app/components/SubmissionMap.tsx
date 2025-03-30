'use client';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css'
import { Input } from "@/components/ui/input";
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import '../assets/App.css';

interface Coordinates {
    lat: number;
    lng: number;
}

interface ChildComponentProps {
    sendMessage: (message: string, coords: Coordinates) => void;  // Prop for the callback function
  }

// Dynamically import the MapContainer from react-leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false, // This disables server-side rendering for this component
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

const SubmissionMap: React.FC<ChildComponentProps> = ({ sendMessage }) => {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: 0,
        lng: 0
    });
    const [address, setAddress] = useState<string>("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Set to true after component mounts on the client
    }, []);

    useEffect(() => {
        if (isClient) {
            // Dynamically import Leaflet only after the client is available
            const L = require('leaflet');

            const map2 = L.map('map2').setView([43.747474670410156, -79.49417877197266], 10);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map2);

            const searchControl = new (GeoSearchControl as any)({
                provider: new (OpenStreetMapProvider as any)(),
                style: 'bar', // You can choose 'bar' or 'button' for the search style
                showMarker: false,
                marker: {
                    draggable: false,
                  }
            });
          
            map2.addControl(searchControl)

            map2.on('geosearch/showlocation', function(e: any) {
                console.log(e);
                var coordlat = e.location.y
                var coordlng = e.location.x
                if (coordlat !== null && coordlng !== null) {
                    setCoordinates({
                        lat: coordlat,
                        lng: coordlng
                    });
                    
                    map2.setView([coordlat, coordlng]);
                }
            });

            map2.on('click', function(e: L.LeafletMouseEvent) {
                var coord = e.latlng
                var coordlat = coord.lat;
                var coordlng = coord.lng;

                setCoordinates({
                    lat: coordlat,
                    lng: coordlng
                });
                
                // marker.setLatLng(newLatLng);

                axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + coordlat + '&lon=' + coordlng)
                .then(result => {
                    console.log(result.data);
                    let addressData = result.data.address;
                    var aString = ((addressData.house_number ? addressData.house_number + " " : "") + addressData.road + ", " + addressData.city
                    + ", " + addressData.state + " " + addressData.postcode + ", " + addressData.country);
                    sendMessage(aString, {
                        lat: coordlat,
                        lng: coordlng
                    });

                    setAddress(aString);
                });
            });


        }
    }, [isClient]); // Ensure this code runs once the component is mounted

    return (
        <div className="h-75 w-104 br-100 z-0">
            {isClient && (
                <>
                <div id="map2" style={{ height: '100%', zIndex: 0}}></div>
                <Input
                    className = "mt-3"
                    type="text"
                    placeholder="Location Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                {address.length > 0 ? (
                    <div>
                    </div>  
                ) : (
                    <div></div>
                )}
                </>
            )}
        </div>
    );
}

export default SubmissionMap;
