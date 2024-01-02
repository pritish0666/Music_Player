"use client"

import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name, // Set the display name with the provided name
      };

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, userData);

      // Redirect to "/main" after successful signup
      router.push('/main');
    } catch (error:any) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className='container mx-auto my-8 p-8 max-w-md bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <div className='mb-4'>
        <input
          className='w-full p-2 border border-gray-300 rounded-md'
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <input
          className='w-full p-2 border border-gray-300 rounded-md'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <input
          className='w-full p-2 border border-gray-300 rounded-md'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700'
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
