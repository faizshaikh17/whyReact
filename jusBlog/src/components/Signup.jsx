import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../features/authSlice'
import { Link } from 'react-router-dom'


function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("")
        console.log(data);
        try {
            const userData = await authService.createAccount({ ...data });

            if (userData) {

                const userData = await authService.getUser();
                if (userData) dispatch(login(userData))
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`w-full max-w-3xl bg-white text-black rounded-xl p-6 border border-black/10`}>

                <h2 className="text-center text-2xl text-purple-500 font-bold leading-tight">Sign up to create Account</h2>
                <p className="mt-2 text-center text-base text-black/60">Already have an account?
                    <Link to={"/login"} className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='flex py-3 space-x-6'>
                        <div className='space-y-4 px-2'>
                            <Input type="text" placeholder='John Doe' label="Full Name" {...register("name", { required: true })} />
                            <Input type="email" placeholder='johndoe@gmail.com' label="Email" {...register("email", {
                                required: true, validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })} />
                            <Input type="password" placeholder='Enter your password' label="Password" {...register("password", { required: true })} />
                        </div>
                        <div className='space-y-4 px-2'>
                            <Input type="file" label="Profile Picture" {...register("profileImage", { required: true })} />
                            <Input type="text" placeholder='jonhdoe7' label="Username" {...register("username", {
                                required: true
                            })} />
                            <Input type="password" placeholder='Enter your password' label="Confirm Password" {...register("confirmPassword", { required: true })} />
                        </div>
                    </div>
                    <div className='flex justify-center pt-7 w-full'>
                        <Button className=" w-full text-white  py-2 text-xl bg-purple-400 " type="submit">Create Account</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup