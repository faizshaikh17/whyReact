import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-8 bg-[#09090B] shadow-md z-[10]'>
      <Container>
        <div className='w-full'>
          <nav className='flex items-center text-white'>
            <div className='flex items-center'>
              <Link to='/'>
                <Logo />
              </Link>
            </div>
            <ul className='flex ml-auto space-x-6'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-[#d283ff] border-b-2 border-[#d283ff]'
                            : 'text-white hover:text-[#d283ff] hover:border-b-2 hover:border-[#d283ff]'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn className='px-4 py-2 text-sm font-medium text-white bg-[#d283ff] rounded-lg hover:bg-[#b56aff] transition-all duration-200' />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};