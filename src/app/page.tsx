'use client';
import React from 'react';
import Image from "next/image";
import Map from './Map';
import './App.css'
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <div>
      <Map/>
    </div>
  );
}
