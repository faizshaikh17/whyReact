import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage, content }) {

    return (
        <Link to={`/post/${$id}`}>
            {/* <span className='w-full text-[#FCFCFF]'>---------------------</span> */}
            <div className='w-full text-[#FCFCFF]'>
                <div className='w-full'>
                    <div className='flex-col space-y-2 px-4'>
                        <h2 className='text-2xl font-bold'>{title}</h2>
                        <p className='text-lg'>{content}</p>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default PostCard