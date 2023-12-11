"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterBusinessForm(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !password || !description){
            setError('Please fill out all fields');
            return;
        }
        try {
            const resBusinessExists = await fetch('/api/businessExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const business = await resBusinessExists.json();
            if(business.business){
                setError('Business already exists');
                return;
            }

            const resUserExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const user = await resUserExists.json();
            if(user.user){
                setError('A user already exists with this email');
                return;
            }

            const res = await fetch('/api/registerBusiness', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, description
                })
            });
            if(res.ok){
                const form = e.target;
                //form.reset();
                router.push('/');
            }
            else{
                console.log('Registration Failed');
            }
        } catch (error) {
            console.log('Error during registration', error)
        }
        
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="name"/>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email"/>
            <textarea onChange={(e) => setDescription(e.target.value)}  className="border  py-2 px-6 bg-zinc-100/70 focus:rounded-md focus:outline-none focus:border-blue-800 focus:border-2" placeholder="tell us about your business"/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
            <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>
            {error && (
                <div className="bg-gray-400 px-3 py-1 text-red w-fit rounded-md mt-2">
                    {error} 
                </div>
            )}
        </form>

    )
}