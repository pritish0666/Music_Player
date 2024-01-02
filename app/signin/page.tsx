"use client";

import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const signin = () => {
  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error: any) {
      console.log(error.message);
    }
    router.push("/main");
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-md bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <div className="mb-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700"
        onClick={handleSignIn}
      >
        Login
      </button>
    </div>
  );
};

export default signin;
