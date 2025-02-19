import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage, content }) {

    return (
        <Link to={`/post/${$id}`}>
            {/* <span className='w-full text-[#FCFCFF]'>---------------------</span> */}
            <div className='w-full border-b-[0.08rem] border-dotted pb-4 border-[#828287] '>
                <div className='w-full  '>
                    <div className='flex-col space-y-1'>
                        <h2 className='text-2xl text-[#FCFCFF] font-bold'>{title}</h2>
                        <p className='text-lg text-[#bdbdc3]'>{content}</p>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default PostCard