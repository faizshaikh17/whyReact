import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full h-screen flex justify-center items-center">
                            <h1 className="text-2xl font-bold text-purple-400 hover:text-purple-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <div className=''>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-4 w-2/3'>
                            <PostCard {...post} />
                        </div >
                    ))
                }
            </div>


        </div>
    )
}

export default Home