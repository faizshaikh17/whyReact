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
      <div className={`mx-auto w-auto text-black max-w-lg bg-white rounded-xl p-8 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo className='text-purple-500' />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-4'>
            <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", {
              required: true, validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })} />
            <Input label="Password: " placeholder="Enter your password" type="password" {...register("password", {
              required: true
            })} />
            <div className='flex justify-center pt-5 w-full'>
              <Button className=" w-full text-white  py-2 text-xl bg-purple-500 hover:bg-purple-400 " type="submit">Sign In</Button>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

