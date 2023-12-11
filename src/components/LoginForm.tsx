"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            });
            if (res?.error){
                console.log('See error below: ')
                console.error(res)
                setError('Invalid Crudentials')
                return;
            }
            router.replace('user-home');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-500">
                <h1 className="text-4xl font-bold my-4">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email"/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                    <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
                    {error && (
                        <div className="bg-gray-400 px-3 py-1 text-red w-fit rounded-md mt-2">
                            {error} 
                        </div>
                    )}

                    <Link className="text-sm mt-2 text-right" href={'/register'}>
                        Don't have an account? <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
