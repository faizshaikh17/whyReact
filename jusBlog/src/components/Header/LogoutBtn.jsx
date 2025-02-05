import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const onHandleCLick = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return (
        <button className='inline-bock px-6 py-2 text-xl duration-200 hover:text-purple-300 rounded-full'
            onClick={onHandleCLick}
        >Logout</button>
    )
}

export default LogoutBtn