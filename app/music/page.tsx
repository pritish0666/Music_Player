"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactPlayer from "react-player";


const Page = () => {
    const [cover, setCover] = useState("");
    const [progress, setProgress] = useState(0);
    const [music, setMusic] = useState("");
    const [playing, setPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState("");
    const [name, setName] = useState("");
  
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    const onSearch = async () => {
      const docRef = doc(db, "songs", music);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data)
        setCover(data.cover);
        setAudioUrl(data.url);
        console.log(data.url)
        setName(data.name);
  
        // Uncomment the following line if you want to automatically start playing the song
        setPlaying(true);
      } else {
        console.log("No such document!");
      }
    };
  
    const handlePlayPause = () => {
      setPlaying(!playing);
  
      if (audioRef.current) {
        if (!playing) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    };
  
    useEffect(() => {
      if (audioRef.current) {
        if (playing) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
  
      return () => {
        // Clean up when the component unmounts
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, [playing]);
  
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentPercent =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentPercent);
      }
    };
  
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
        const seekTime =
          (e.target.valueAsNumber / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setProgress(e.target.valueAsNumber);
      }
    };
  
    return (
        <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <div className="flex-1 p-4">
            <h1>FIRST</h1>
          </div>
  
          <div className="flex-1 p-4">
            <h1>second</h1>
            <input
              onChange={(e) => setMusic(e.target.value)}
              type="text"
              placeholder="Search..."
              className="px-4 w-48 py-2 rounded-lg border-none"
            />
            <br />
            <button
              className="bg-gray-500 text-white rounded-lg p-6"
              onClick={onSearch}
            >
              Play Song
            </button>
            <br />
            <br />
          </div>
        </div>

        <div>
          <ReactPlayer
            url={audioUrl}
            playing={playing}
            controls
            width="900px"
            height="50px"
          />
          <button onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
  
        <div className="w-full p-4 bg-gray-800 text-white">
          <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
  
            <div className="flex items-center justify-center">
              {cover && (
                <img
                  src={cover}
                  alt="cover"
                  className="rounded-md shadow-md mb-4"
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </div>
  
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              className="w-full mb-4"
            ></audio>
  
            <div className="flex items-center justify-between">
              <button className="text-3xl">&#9664;</button>
  
              <button
                className="text-5xl"
                onClick={handlePlayPause}
                style={{ cursor: "pointer" }}
              >
                {playing ? "❚❚" : "▶"}
              </button>
  
              <button className="text-3xl">&#9654;</button>
            </div>
  
            <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full mt-4"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Page;
  