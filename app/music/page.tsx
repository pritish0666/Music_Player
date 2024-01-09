"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import ReactPlayer from "react-player";

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [music, setMusic] = useState("");
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [name, setName] = useState("");
  const [allsongs, setAllsongs] = useState([] as any);
  const [song, setSong] = useState("");

  const onSearch = async () => {
    const docRef = doc(db, "songs", music);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);
      setCover(data.cover);
      setAudioUrl(data.url);
      console.log(data.url);
      setName(data.name);

      // Uncomment the following line if you want to automatically start playing the song
      setPlaying(true);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsData = querySnapshot.docs.map((doc) => doc.data());
        setAllsongs(songsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSongClick = (songName: string) => {
    // Set the music
    setSong(songName);
  };

  useEffect(() => {
    const fetchSongData = async () => {
      if (song !== "") {
        const docRef = doc(db, "songs", song);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          setCover(data.cover);
          setAudioUrl(data.url);
          console.log(data.url);
          setName(data.name);

          // Uncomment the following line if you want to automatically start playing the song
          setPlaying(true);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchSongData();
  }, [song]);

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
      <div className="flex flex-1 border-">
        <div className="flex-1 p-4">
          <h1>FIRST</h1>
          <div>
            {allsongs.map((song: any, index: any) => (
              <button
                key={index}
                onClick={() => handleSongClick(song.name)}
                className="text-white bg-blue-500 p-2 m-2 rounded-md"
              >
                {song.name}
              </button>
            ))}
          </div>
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

      <div className="w-full p-4 bg-[rgba(27,29,51,0.5)] text-white">
        <div className="p-4 bg-[rgba(27,29,51,0)] text-white">
          <div className="flex flex-col items-center justify-center">
            <div>
              <h2 className="text-2xl mx-auto font-bold mb-4">{name}</h2>
            </div>
            <div>
              {cover && (
                <img
                  src={cover}
                  alt="cover"
                  className="rounded-md mx-auto shadow-md mb-4"
                  style={{ width: "150px", height: "150px" }}
                />
              )}
              <div>
                {isClient && (
                  <ReactPlayer
                    className="mx-auto"
                    url={audioUrl}
                    playing={playing}
                    controls
                    width="900px"
                    height="50px"
                  ></ReactPlayer>
                )}
                {/* <button onClick={handlePlayPause}>
                {playing ? "Pause" : "Play"}
              </button> */}
              </div>
            </div>
          </div>

          {/* <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              className="w-full mb-4"
            ></audio> */}

          {/* <div className="flex items-center justify-between">
              <button className="text-3xl">&#9664;</button>
  
              <button
                className="text-5xl"
                onClick={handlePlayPause}
                style={{ cursor: "pointer" }}
              >
                {playing ? "❚❚" : "▶"}
              </button>
  
              <button className="text-3xl">&#9654;</button>
            </div> */}

          {/* <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full mt-4"
            /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
