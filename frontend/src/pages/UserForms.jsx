import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UserForms = () => {
    const { userId } = useParams();
    const [forms, setForms] = useState()
    console.log('userId', userId)
    useEffect(() => {
        async function getUserForms() {
            try {
                const response = await axios.get(`http://localhost:3000/user-forms/${userId}`)
                setForms(response?.data)
                console.log('response', response)
            } catch (error) {
                console.log(error)
                toast({
                    title: "Error",
                    description: error?.response?.data?.error || "Invalid email or password.",
                    variant: "destructive",
                })
            }
        }
        getUserForms()
    }, [])
    console.log(forms?.forms?._id)

    return (
        <div>
            <h1 className='text-7xl mb-10'>
                UserForms
            </h1>
            <ul>
                {forms?.forms?.map((form) => {
                    return <li> <Link to={`/forms/${form?._id}`}>{form?.title}</Link></li>
                })}
            </ul>
        </div>
    )
}

export default UserForms