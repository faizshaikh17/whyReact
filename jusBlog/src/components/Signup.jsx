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
        <div className="flex items-center justify-center bg-gray-100"> {/* Added min-h-screen and background color */}
            <div className={`w-full max-w-3xl bg-white text-black rounded-2xl p-6 border border-gray-200 shadow-xl`}> {/* Adjusted padding, border, and shadow */}

                <h2 className="mb-3 text-center text-3xl text-purple-600 font-semibold leading-tight">Sign up to create Account</h2> {/* Adjusted margin, font size, color, and weight */}
                <p className="mb-5 text-center text-lg text-gray-700">Already have an account? {/* Adjusted margin, font size, and color */}
                    <Link to={"/login"} className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200"> {/* Adjusted link styling */}
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-3 text-center text-red-500">{error}</p>} {/* Adjusted margin and color */}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='flex py-3 space-x-6'> {/* Adjusted padding and spacing */}
                        <div className='space-y-5 px-2'> {/* Adjusted spacing and padding */}
                            <Input type="text" placeholder='John Doe' label="Full Name" {...register("name", { required: "Full Name is required" })} /> {/* Added required message */}
                            <Input type="email" placeholder='johndoe@gmail.com' label="Email" {...register("email", {
                                required: "Email is required", validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                }
                            })} />
                            <Input type="password" placeholder='Enter your password' label="Password" {...register("password", { required: "Password is required" })} /> {/* Added required message */}
                        </div>
                        <div className='space-y-5 px-2'> {/* Adjusted spacing and padding */}
                            <Input type="file" label="Profile Picture" {...register("profileImage", { required: "Profile Image is required" })} /> {/* Added required message */}
                            <Input type="text" placeholder='jonhdoe7' label="Username" {...register("username", {
                                required: "Username is required" // Added required message
                            })} />
                            <Input type="password" placeholder='Enter your password' label="Confirm Password" {...register("confirmPassword", { required: "Confirm Password is required" })} /> {/* Added required message */}
                        </div>
                    </div>
                    <div className='flex justify-center pt-4 w-full'> {/* Adjusted padding */}
                        <Button className="w-full py-3 px-6 text-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-xl shadow-md transition-colors duration-300" type="submit">Create Account</Button> {/* Adjusted button styling */}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup