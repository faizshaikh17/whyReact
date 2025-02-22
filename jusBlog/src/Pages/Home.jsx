import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/config'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        databaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (!authStatus) {
        return (
            <main className="flex-grow w-full flex flex-col items-center justify-center bg-[#09090B]">
                <section className="text-center px-4">
                    <div className='flex flex-col space-y-4 animate-fade-in'>
                        {/* Animated Heading */}
                        <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 animate-text-glow">
                            Ideas & Stories
                        </h1>
                        <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 animate-text-glow">
                           Whatever, <span className='text-[#c86bfa]'>Blog</span>
                        </h1>
    
                        {/* Subtitle with Animation */}
                        <p className="mt-8 text-sm md:text-xl text-gray-200 font-light tracking-wide animate-fade-in-delay">
                           JusBlog It!
                        </p>
    
                        {/* Call-to-Action Button */}
                        {/* <div className="mt-12 animate-bounce-in">
                            <button 
                                className="bg-[#c86bfa] hover:bg-purple-500 text-white font-semibold mt-4 py-3 px-8 rounded-full 
                                transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                            >
                                Get Started
                            </button>
                        </div> */}
                    </div>
                </section>
            </main>
        );
    } else {
        return (
            <div className='w-full px-2 py-8 '>
                <div className='flex flex-col gap-6'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className=' w-2/3'>
                                <PostCard {...post} />
                            </div >
                        ))
                    }
                </div>


            </div>
        )
    }
}
export default Home