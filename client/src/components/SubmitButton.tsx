"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'



const SubmitButton = () => {

    const { pending } = useFormStatus()

    return (
        <button type='submit' disabled={pending} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md">{pending ? "loading" : "submit"}</button>
    )
}

export default SubmitButton