"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterUserForm(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !password){
            setError('Please fill out all fields');
            return;
        }
        try {
            const resUserExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const user = await resUserExists.json();
            if(user.user){
                setError('User already exists');
                return;
            }
            
            const resBusinessExists = await fetch('/api/businessExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const business = await resBusinessExists.json();
            if(business.business){
                setError('A business exists with this email');
                return;
            }

            const res = await fetch('/api/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password
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