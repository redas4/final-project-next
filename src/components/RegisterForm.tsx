"use client";

import RegisterUserForm from "@/app/subcomponents/RegisterUserForm";
import RegisterBusinessForm from "@/app/subcomponents/RegisterBusinessForm";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm(){
    const [form, setForm] = useState('user');

    return(
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-500">
                <h1 className="text-4xl font-bold my-4">Register</h1>
                <button onClick={(e) => setForm('user')} className={`m-1 px-3 py-1 text-bold rounded-md border-2 border-gray-400 ${form === 'user' ? 'selected' : ''}`}>User</button>
                <button onClick={(e) => setForm('business')} className={`m-1 px-3 py-1 text-bold rounded-md border-2 border-gray-400 ${form === 'business' ? 'selected' : ''}`}>Business</button>
                {form === "user" ? (
                    <RegisterUserForm />
                ) : (
                    <RegisterBusinessForm />
                )}
                <Link className="text-sm mt-2 text-right py-1" href={'/'}>
                    Already have an account? <span className="underline">Login</span>
                </Link>
            </div>
        </div>
    )
}