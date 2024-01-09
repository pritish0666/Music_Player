"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router=useRouter();

  const navigateToMusic = () => {
    router.push('/music');
  }



  const words = ["CHORDS", "MUSIC-VERSE"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((index) => (index + 1) % words.length);
          setTimeout(() => {
            setIsDeleting(false);
          }, 500); // Adjust the delay as needed
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          setIsDeleting(true);
        }
      }
    };

    const typingInterval = setInterval(type, 140);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentWordIndex, currentText, isDeleting]);

  return (
    <div>
      <div className="h-lvh flex-col justify-center items-center">
        <div className="flex mt-9 justify-center items-center">
          <h1 className="text-bold text-[#E0FFFF] text-5xl">
            Welcome to{" "}
            {currentText === "CHORDS" ? (
              <span className=" font-extrabold text-bold text-5xl text-[#87CEFA]">
                {currentText} 🎹
              </span>
            ) : (
              <span className=" font-extrabold text-bold text-5xl text-[#87CEFA]">
                {currentText}
              </span>
            )}
          </h1>
        </div>
        <div className="flex justify-center items-center p-3 mt-5">
          <h1 className="font-serif text-[#eaed60] text-extrabold text-xl">
            "Music : the timeless echo that fills the spaces between stars."
          </h1>
        </div>

        <div className="bg-[rgba(21,29,51,0.7)] border-yellow-300 p-6 rounded-md mx-auto mt-[40px] shadow-lg h-[350px] w-[800px] flex flex-col justify-center items-center">
          <div>
            <p className="text-4xl font-serif text-white mb-4">
              Feel the cosmic notes in the musical world !
            </p>
          </div>
          <div>
            <button onClick={navigateToMusic} className="rounded-md mt-7 text-bold text-xl bg-inherit text-white p-5 border border-red-800">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
