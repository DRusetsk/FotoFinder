'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import SubmissionMap from "./SubmissionMap";
import { imgDB, rtDB } from "../firebaseconfig";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {set, ref as dbRef, update} from 'firebase/database';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import EXIF from 'exif-js';
import FilterDropdown from "@/app/components/Filter";

interface Coordinates {
    lat: number;
    lng: number;
}

type Filter = 'All' | 'Urban' | 'Wildlife' | 'Sports' | 'Nature';

const Submission: React.FC = () => {
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('All');
  const [files, setFiles] = useState<File[]>([]);
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState<string>("");
  const locationRef = dbRef(rtDB, 'locations/' + locationName);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!locationName || !description || !address || files.length === 0) {
      alert("Please fill out all fields and upload at least one photo.");
      return;
    }

    // Update Firebase DB
    set(locationRef, {
        locationName: locationName,
        locationDescription: description,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
        locationAddress: address,
        tag: selectedFilter
    })


    files.map((file, index) => {
        const reader = new FileReader();
        const imageRef = ref(imgDB, `images/${file.name + v4()}`);
        reader.onload = (event) => {
          if (!event.target?.result) return;
          
          // Read EXIF data
          const exifData = EXIF.readFromBinaryFile(event.target.result as ArrayBuffer);
          const metadata = {
              model: exifData.Model || "Unknown",
              timestamp: exifData.DateTimeOriginal || "Unknown",
              lensModel: exifData.LensModel || "Unknown",
              shutterSpeed: exifData.ShutterSpeed || "Unknown",
              exposureTime: exifData.ExposureTime || "Unknown",
              aperture: exifData.FNumber || "Unknown",
              focalLength: exifData.FocalLength || "Unknown",
              iso: exifData.ISOSpeedRatings || "Unknown"
          };

          const uploadPromise = uploadBytes(imageRef, file)
          .then(snapshot => getDownloadURL(ref(imgDB, snapshot.metadata.fullPath)))
          .then(url => {
              console.log(url);
              set(dbRef(rtDB, 'locations/' + locationName + `/imgURLs/${index}`), {
                  url: url,
                  metadata: metadata
              })
          });
        };

        reader.readAsArrayBuffer(file);
    });

    // Handle form submission (e.g., API request)
    // console.log({ locationName, description, address, files });
    alert("Submission successful!");
    router.push('/');
  };

  const handleAddress = (address: string, coordinates: Coordinates) => {
    setAddress(address);  // Update the state with the new message
    setCoordinates(coordinates);
    console.log(coordinates.lat);
    console.log(address);
  };

  const filterCallback = () => {
    //   const databaseRef = dbRef(rtDB, 'locations/');  
        console.log(selectedFilter);
  };

  return (
    <div>
        <div className="max-w-lg mx-auto p-6">
        <Card>
            <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Submit a Location</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="text"
                placeholder="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
                />
                <Textarea
                placeholder="Location Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <div className="flex justify-center p-2">
                    <FilterDropdown selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} filterCallback={filterCallback}/>
                </div>


                <h2 className = "text-m font-semibold mb-2">Pin a location on the map!</h2>

                <SubmissionMap sendMessage = {handleAddress}></SubmissionMap>
                <br></br>
                <br></br>
                <label className="block border-dashed border-2 p-4 text-center cursor-pointer rounded-lg">
                <Upload className="inline-block mr-2" />
                <span>Upload Photos</span>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                </label>
                <div className="mt-2 justify-center">
                {files.map((file, index) => (
                    <div className="flex justify-center">
                        <img src = {URL.createObjectURL(file)} style = {{width: "200px"}}></img>
                    </div>
                ))}
                </div>
                <Button type="submit" className="w-full">Submit</Button>
            </form>
            </CardContent>
        </Card>
        </div>
    </div>
  );
};

export default Submission;