import './App.css'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/authSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(logout()); // Ensure logout on error
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // Call the async function
  }, [dispatch]);  // Only dispatch as a dependency


  return !loading ? (
    <div className='flex flex-col min-h-screen w-full text-black'>
      <Header />
      <main className='relative flex flex-grow items-center justify-center overflow-hidden'>  {/* Added relative and overflow-hidden */}
        {/* Subtle Noise Overlay */}
        <div className="absolute z-[1] inset-0 bg-[url('/noise.png')] bg-repeat opacity-10 mix-blend-overlay"></div>

        {/* Falling Beam Effects */}
        <div className="absolute z-[2] inset-0 pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-pink-400 to-transparent opacity-0 animate-falling-beam"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-[3] w-full">  {/* Add zIndex to this div */}
           <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null
}

export default App