import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const Navbar = () => {
  return (
    <header className='px-5 py-3'>
    <nav className='flex  items-center h-[75px] justify-between'>
      <div className='flex items-center'>
        <Link href="/" className=''>
        <Image src= "/logo.jpg" alt='logo-image' width={90} height={30} />
        </Link>
        <h1 className=''>
          BD  Consultancy
        </h1>
      </div>
        <div className='flex items-center gap-5'>
            <Link href="#"> 
            <h1>Home</h1>
            </Link>
            <Link href="#"> 
            <h1>FAQs</h1>
            </Link>
            <Link href="#"> 
            <h1>About Us</h1>
            </Link>
            <Link className='mx-5' href="#"> 
            <h1 className='h-10 w-10 bg-blue-40 text-center bg-blue-400'>Login</h1>
            </Link>
        </div>
    </nav>
    </header>
  )
}

export default Navbar