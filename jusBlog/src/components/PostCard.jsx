import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";



function PostCard({ $id, title, featuredImage, content }) {

    return (
        <Link to={`/post/${$id}`}>
            {/* <span className='w-full text-[#FCFCFF]'>---------------------</span> */}
            <div className='w-full h-[22vh] p-4 rounded-md bg-[#171717] border-[0.08rem] pb-4 border-[#828287] '>
                <div className='w-full  '>
                    <div className='flex-col space-y-1'>
                        <h2 className='text-2xl text-[#FCFCFF] font-bold'>{title}</h2>
                        <p className='text-lg text-[#bdbdc3]'>{parse(content.slice(0,100)+"....")}</p>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default PostCard