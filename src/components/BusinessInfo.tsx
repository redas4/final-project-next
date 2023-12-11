"use client";

import BusinessReviewList from '@/app/subcomponents/BusinessReviewList';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function BusinessInfo(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([]);

    const {data: session} = useSession();

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (session?.user?.email) {
              const res = await fetch('/api/getBusinessReviews', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email }),
              });
    
              if (!res.ok) {
                throw new Error('Failed to fetch business data');
              }
              const data = await res.json();
              setEmail(data.business.email);
              setName(data.business.name);
              setDescription(data.business.description);
              setReviews(data.business.reviews);
            }
          } catch (error) {
        }
        };
        fetchData();
        const fetchType = async () => {
          try {
              const res = await fetch('/api/getType', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: session?.user?.email }),
              });
      
              if (!res.ok) {
                  throw new Error('Failed to fetch business data');
              }
              const data = await res.json();
              if(data.type === 'user') {
                  router.replace('user-home');
              } else if(data.type === 'none'){
                router.replace('/')
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchType();
      }, [session]);



      return (
        <div className="grid place-items-center h-screen">
          <div className="shadow-lg p-5 rounded-lg border-t-4 border-violet-500 flex flex-col items-center">
            <h1 className='font-bold text-2xl'>My Information</h1>
            <div>
              Name: <span className="font-bold">{name}</span>
            </div>
            <div>
              Email: <span className="font-bold">{email}</span>
            </div>
            <div>
              Description: <span className="font-bold">{description}</span>
            </div>
            <button
              onClick={() => {signOut(); router.replace('/')}}
              className="bg-violet-700 text-white font-bold px-6 py-2 mt-3"
            >
              Logout
            </button>
          </div>
          <h2 className="text-xl font-semibold mb-4">Reviews about me:</h2>
          <BusinessReviewList reviews={reviews} />
        </div>
    );
}