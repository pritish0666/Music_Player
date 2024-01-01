"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MusicPlayer = () => {
  const [cover, setCover] = useState('');
  const [progress, setProgress] = useState(0);
  const [music, setMusic] = useState('');
  const [trackid, setTrackid] = useState('');
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

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

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
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

  const fetchAudioUrl = async () => {
    try {
      const response = await axios.get(
        'https://spotify23.p.rapidapi.com/search/',
        {
          params: {
            q: music,
            type: 'tracks',
            offset: '0',
            limit: '1',
            numberOfTopResults: '1',
          },
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOS,
          },
        }
      );

      const realid = response.data.tracks.items[0].data.id;
      const imgurl =
        response.data.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;
      setTrackid(realid);
      setCover(imgurl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAudio = async () => {
      const options1 = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/tracks/',
        params: {
          ids: trackid,
        },
        headers: {
          'X-RapidAPI-Key':
          process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await axios.request(options1);
        // console.log(response.data.tracks[0].preview_url);
        setAudioUrl(response.data.tracks[0].preview_url);
      } catch (error) {
        console.error(error);
      }
    };

    if (trackid) {
      fetchAudio();
    }
  }, [trackid]);
  let titlee;
  useEffect(() => {
     titlee=music;
  },[music])
  

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
            onClick={fetchAudioUrl}
          >
            Play Song
          </button>
          <br />
          <br />
        </div>
      </div>

      <div className="w-full p-4 bg-gray-800 text-white">
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4">{titlee}</h2>

        <div className="flex items-center justify-center">
          {cover && <img
            src={cover}
            alt="cover"
            className="rounded-md shadow-md mb-4"
            style={{ width: "200px", height: "200px" }}
          />}
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

export default MusicPlayer;
