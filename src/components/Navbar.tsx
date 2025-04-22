'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { doLogout } from '../app/actions/index'; 

interface SessionProps {
  user?: {
    name?: string;
    email?: string;
  }
}

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
    }, [session]);

    const handleLogout = () => {
        doLogout();
        setIsLoggedIn(!!session?.user);
      };

    return (
    <nav className='bg-bulldog border-b-1 border-chapel'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-20 items-center justify-evenly'>
                <div className='flex items-center justify-start'>
                    <div className='hidden md:ml-6 md:block'>
                        <div className='flex space-x-2 ml-6'>
                            <Link href='/' className='text-chapel hover:bg-stegeman  hover:text-stegeman rounded-md px-3 py-2'>Home</Link>
                            <Link href='/map' className='text-chapel hover:bg-stegeman hover:text-stegeman rounded-md px-3 py-2'>Map</Link>
                        {/*  <Link href='/settings' className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Settings</Link>*/}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center flex-1'>
                    <h1 className='text-chapel text-xl font-bold bg-glory rounded-md px-3 py-2'>Where UGA?</h1>
                </div>

                <div className="hidden md:block md:ml-6">
                    <div className="flex items-center justify-end text-chapel space-x-4">
                        {isLoggedIn && session?.user ? (
                            <>
                                <span>Welcome, {session.user?.name || session.user?.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="hover:bg-stegeman rounded-md px-4 py-2 block text-center"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    href="/login"
                                    className="hover:bg-stegeman rounded-md px-4 py-2 block text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="hover:bg-stegeman rounded-md px-4 py-2 block text-center"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </nav>

    );
}

export default Navbar;