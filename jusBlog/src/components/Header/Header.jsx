import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className=' py-8 flex z-[10] bg-[#09090B]  top-0 items-center shadow justify-center'>
      <Container>
        <div className='w-full '>
          <nav className='flex items-center text-white'>
            <div className='flex items-center'>
              <Link to='/'>
                <Logo />
              </Link >
            </div>
            <ul className='flex ml-auto'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button className={`inline-bock px-3 py-2 text-base duration-200 ${item.active ? "text-[#d283ff]" : ""} rounded-full`} onClick={() => navigate(item.slug)}>{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li><LogoutBtn /></li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
