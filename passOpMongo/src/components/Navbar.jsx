import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-100'>
        <div className="mycontainer px-4 py-5 flex justify-between items-center h-15">

      <div className="logo font-bold text-2xl ">
        <span className="text-blue-500">&lt;</span>
        <span>Pass</span>
        <span className="text-blue-500">OP/&gt;</span>
        
      </div>
        {/* <ul>
            <li className='flex gap-4'> 
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <button className='bg-blue-300 my-4 rounded-md flex items-center justify-between ring-1 ring-white'>
          <img className='invert-0 w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className="font-bold px-2">GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
