import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import databaseService from '../appwrite/config';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        databaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (!authStatus) {
        return (
            <main className=" relativ flex-grow w-full flex flex-col items-center justify-center overflow-hidden">
                <section className="text-center px-4 relative">
                    <div className='flex flex-col animate-fade-in'>
                        <h1 className="text-4xl font-light md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-400 animate-text-glow leading-tight pt-serif-regular">
                            Ideas &
                        </h1>
                        <h1 className="text-4xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-white animate-text-glow leading-tight pt-serif-regular">
                            Stories
                        </h1>

                    </div>
                    <p className=" mt-10 text-sm md:text-lg text-gray-300 font-light tracking-wide animate-fade-in-delay pt-serif-regular-italic">
                        Unleash, Express, Represent your voice.
                    </p>
                </section>
            </main>
        );
    } else {
        return (
            <div className='w-full px-2 py-8'>
                <div className='flex flex-col gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-2/3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;