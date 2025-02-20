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
            <main className="flex-grow flex flex-col items-center justify-center h-[70vh]">
                <section className="text-center ">
                    <div className='flex flex-col'>
                        <h1 className={`text-3xl md:text-6xl font-bold text-white `}>
                            Peek in the World of
                        </h1>
                        <h1 className={`text-3xl md:text-6xl font-bold text-white `}>
                            Amazing <span className='text-[#c86bfa]'>Blogs.</span>
                        </h1>
                    </div>

                    <p className={`mt-5 py-3 text-lg max-sm:text-xs text-gray-500 dark:text-gray-300 text-center tracking-normal leading-6`}>
                        JusBlog it!
                    </p>
                </section>
            </main>
        )
    } else {
        return (
            <div className='w-full px-2 py-8'>
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