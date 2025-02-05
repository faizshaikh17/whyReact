import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage, content }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white text-black rounded-xl p-4 h-[30vh]'>
                <div className='w-full flex items-center px-2 mb-4'>
                    <img className='rounded-xl w-full h-44 bg-purple-300' src={databaseService.getFilepreview(featuredImage)} alt={""} />
                    <div className='px-4'>
                        <h2 className='text-xl font-bold '>{title}</h2>
                        <p>{content}</p>
                    </div>

                </div>
            </div>
        </Link >
    )
}

export default PostCard