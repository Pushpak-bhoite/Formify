import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='text-5xl'>Welcome to home page </div>
            <Link to='/sign-in'>Sign in </Link>
            <br />
            <br />
            <br />
            <Link to='/sign-up'>Sign up </Link>
        </div>
    )
}

export default Home