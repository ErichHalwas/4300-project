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
    <nav className='bg-red-700 border-b-1 border-white'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-20 items-center justify-between'>
                <div className='flex flex-1 items-center justify-start'>
                    <div className='hidden md:ml-6 md:block'>
                        <div className='flex space-x-2 ml-6'>
                            <Link href='/' className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Home</Link>
                            <Link href='/map' className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Map</Link>
                            <Link href='/settings' className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>Settings</Link>
                        </div>
                    </div>
                </div>

                <div className='absolute inset-x-0 flex justify-center'>
                <h1 className='text-white text-xl font-bold'>Amenities Application</h1>
                </div>

                <div className="hidden md:block md:ml-6">
                    <div className="flex items-center justify-end text-white space-x-4">
                        {isLoggedIn && session?.user ? (
                            <>
                                <span>Welcome, {session.user?.name || session.user?.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2 block text-center"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    href="/login"
                                    className="bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2 block text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-gray-400 hover:bg-gray-500 rounded-md px-4 py-2 block text-center"
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