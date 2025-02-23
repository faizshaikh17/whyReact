import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from './index'
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin } from '../features/authSlice'
import { Link } from 'react-router-dom';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getUser()
        if (userData) dispatch(authLogin(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-auto  max-w-lg bg-white rounded-2xl p-7 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300`}> {/* Increased shadow and rounded corners */}
        {/* <div className="mb-5 flex justify-center"> Increased margin */}
          {/* <span className="inline-block w-full max-w-[100px]"> */}
            {/* <Logo className='' /> */}
          {/* </span> */}
        {/* </div> */}
        <h2 className="text-center  font-semibold leading-tight text-gray-800">Sign in to your account</h2> {/* Increased font size and darkened color */}
        <p className="mt-1 text-center text-base text-gray-700"> {/* Adjusted margin and font size */}
          Don't have an account? 
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200" // Improved focus and hover
          >Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-6'> {/* Increased space between input fields */}
            <Input label="Email:" placeholder="Enter your email" type="email" {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email address",
              }
            })} />
            <Input label="Password:" placeholder="Enter your password" type="password" {...register("password", {
              required: "Password is required"
            })} />
            <div className='flex justify-center w-full'>
              <Button className="w-full py-2 mt-3 px-6  text-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-xl shadow-md transition-colors duration-300" type="submit">Sign In</Button> {/* Significant button enhancement */}
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}