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
    authService.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      }).finally(setLoading(false))
  }, [loading])



  return !loading ? (
    <>
      <div className='flex flex-wrap z-[0] content-between w-full text-black'>
        <div className='w-full block text-2xl'>
          <Header />
          <main className='w-full flex items-center justify-center  min-h-[77.5vh]'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null
}

export default App
