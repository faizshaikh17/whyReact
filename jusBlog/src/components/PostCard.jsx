import React from 'react';
import databaseService from '../appwrite/config';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full flex h-[22vh] gap-4 p-4 rounded-lg bg-[#171717] hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl border border-[#2a2a2a] hover:border-[#828287]'>
                <div className='w-3/4 flex flex-col justify-between'>
                    <div className='space-y-2'>
                        <h2 className='text-xl text-[#FCFCFF] font-bold hover:text-[#c9c9c9] transition-colors duration-200'>
                            {title}
                        </h2>
                        <div className='bg-[#2a2a2a] p-2 rounded-md'>
                            <p className='text-sm text-[#bdbdc3]'>
                                {parse(content.slice(0, 50) + " ...Read More")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-1/4 flex items-center justify-center'>
                    <img
                        className='rounded-md object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out'
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                    />
                </div>
            </div>
        </Link>
    );
}

export default PostCard;