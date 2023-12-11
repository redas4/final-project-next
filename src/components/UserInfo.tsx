"use client";

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import BusinessList from '@/app/subcomponents/BusinessList';
import UserReviewList from '@/app/subcomponents/UserReviewList';

export default function UserInfo(){
    const [reviews, setReviews] = useState([]);

    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
              if (session?.user?.email) {
                const res = await fetch('/api/getUserReviews', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: session.user.email }),
                });
      
                if (!res.ok) {
                  throw new Error('Failed to fetch user reviews');
                }
                const data = await res.json();
                setReviews(data.user.reviews);
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
                if(data.type === 'business') {
                  router.replace('business-home')
                } else if(data.type === 'none'){
                  router.replace('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchType();
    },[session])
    
    const handleClick = (e: React.FormEvent) => {
        e.preventDefault()
        signOut();
        redirect('/')
    }
    return (
        <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500 flex flex-col items-center">
            <div className="mb-4">
            <p className="text-gray-800">
                Name: <span className="font-semibold">{session?.user?.name}</span>
            </p>
            </div>
            <div className="mb-4">
            <p className="text-gray-800">
                Email: <span className="font-semibold">{session?.user?.email}</span>
            </p>
            </div>
            <button
            onClick={() => {signOut(); router.replace('/')}}
            className="bg-blue-500 text-white font-bold px-6 py-2 rounded mt-3 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
            Logout
            </button>
        </div>
        <BusinessList userEmail={session?.user?.email || undefined}></BusinessList>
        <h2 className="text-xl font-semibold mb-4">Reviews I wrote:</h2>
        <UserReviewList reviews={reviews || undefined} />
        </div>
        
    )
}