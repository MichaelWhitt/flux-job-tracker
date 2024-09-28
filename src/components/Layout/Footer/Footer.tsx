import { useState, useEffect, useContext } from 'react'
import { Link } from 'wouter'
import { IconCopy, IconCircleCheck } from '@tabler/icons-react'
import { AppContext } from '../../../auth/AppContext'
import SubscribeForm from './SubscribeForm'
import CopyClipboard from '../../Buttons/ClipboardCopy'

const Footer = () => {
  const appContext = useContext(AppContext)

  return (
    <footer className='bg-gradient-to-r from-bg5 to-bg5 via-bg3 h-fit text-center font-nunito font-bold text-white w-full overflow-hidden break-al mb-[56px] md:mb-0'>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='flex flex-col justify-center text-white m-2'>
          <span className='text-lg'>{appContext?.siteName || ''}</span>
          <span className='text-sm'>Welcome, brethren.</span>
        </div>
        <div className='flex flex-col justify-center all-center text-white m-2'>
            <span className='text-lg'>Subscribe for updates!</span>
            <SubscribeForm class={'flex-col'} />
        </div>
        <div className='flex flex-col justify-center text-white m-2 gap-1'>
          <Link to='/terms' className='text-lg hover:text-bg10 ease'>Terms and Conditions</Link>
          <Link to='/privacy' className='text-lg hover:text-bg10 ease'>Privacy Policy</Link>
          <Link to='/cookiepolicy' className='text-lg hover:text-bg10 ease'>Cookie Policy</Link>
        </div>
        <div className='flex flex-col justify-center text-white m-2'>
          <div className='text-lg'>Let's Chat!</div>
          <CopyClipboard text={'mwhittdev@gmail.com'} />
        </div>
      </div>
      {/* <div className='h-[40px] all-center hover:bg-primary-800 ease cursor-pointer font-bold text-white'>
        <Link to='/admin' className='w-full'>Admin Panel</Link>
      </div> */}
    </footer>
  )
}

export default Footer
