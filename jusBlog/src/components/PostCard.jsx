import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";



function PostCard({ $id, title, featuredImage, content }) {

    return (
        <Link to={`/post/${$id}`}>
            {/* <span className='w-full text-[#FCFCFF]'>---------------------</span> */}
            <div className='w-full flex h-[22vh] p-4 rounded-md relative bg-[#171717]  pb-4 border-[#828287] '>
                <div className='w-full flex items-center justify-between  '>
                    <div className=' space-y-1'>
                        <h2 className='text-xl text-[#FCFCFF] font-bold'>{title}</h2>
                        <p className='text-base text-[#bdbdc3]'>{parse(content.slice(0, 100) + "....")}</p>
                    </div>
                </div>
                <div className='flex p-1 w-1/3'>
                    <img className=" rounded-md" src={databaseService.getFilePreview(featuredImage)} alt={title} />
                </div>
            </div>
        </Link >
    )
}

export default PostCard