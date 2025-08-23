import { SkullIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center ' >
        <div className='flex flex-col justify-center items-center' >
            <h1 className='flex items-center text-3xl md:text-6xl' >404 Not Found <SkullIcon className='size-10  md:size-20 text-red-500 ' /> </h1>
            <Link to={'/'} className='text-[22px]' >Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound