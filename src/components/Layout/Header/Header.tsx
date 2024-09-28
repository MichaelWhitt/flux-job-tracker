import {useContext, useState, useEffect} from 'react'
import {AppContext} from '../../../auth/AppContext'
import { Button } from '../../Buttons/Button'
import { Link } from 'wouter'
import { IconPlus, IconMoodCog } from '@tabler/icons-react'
import SkeletonLoader from '../../Loaders/SkeletonLoader'
import { isOnMobile } from '../../../utils/utils'

interface HeaderProps {
    
}

const Header: React.FC = () => {
  const appContext = useContext(AppContext)
  const isLoggedIn = appContext?.isLoggedIn
  const [imageLoaded, setImageLoaded] = useState(false)


  const handleImageLoad = () => {
      setImageLoaded(true)
  }
  
  const renderHeaderAcctImage = () => {
  
      if (isLoggedIn) {
          const profilePic = appContext?.user?.profilePic
  
          if (appContext?.user?.email !== '' && (!profilePic || profilePic === '')) {
              return <IconMoodCog className='text-bg10 w-[40px] h-[40px]' />
          } else {
              return (
                  <div className='all-center h-full'>
                      {!imageLoaded && <SkeletonLoader />}
                      <img
                          src={profilePic}
                          className={`w-[40px] h-[40px] rounded-full outline outline-moviered ${
                              imageLoaded ? 'block' : 'hidden'
                          }`}
                          onLoad={handleImageLoad}
                      />
                  </div>
              )
          }
      }
  
      return null
  }

  return (
    isOnMobile ? (
        <header className='bg-bg1 h-[60px] fixed top-0 left-0 w-full flex justify-between items-center z-10 px-4 '>
            <Link to='/'>
                <div className='text-white text-[35px] font-nunito font-bold'>
                jTracker
                </div>
            </Link>
            <Link to='/account'>
                {renderHeaderAcctImage()}
            </Link> 
        </header>        
    ) : (
        <header className='bg-bg1 h-[60px] fixed top-0 left-0 w-full flex justify-between items-center z-10 px-4'>
        <Link to='/'>
            <div className='text-white text-[40px] md:text-[50px] font-nunito font-bold'>
                jTracker
            </div>
        </Link>

        <div className='flex space-x-4'>
            {/* <Link to='/test'>
                <Button
                    onClick={() => console.log('Button 1 clicked')}
                    type='danger'
                    //tooltipText='Button 1'
                >
                    Button 2
                </Button>
            </Link>     */}
            <Link to='/account'>
                {renderHeaderAcctImage()}
            </Link>    
            {isLoggedIn ? (
                <Button
                    onClick={() => {
                        if (isLoggedIn && appContext?.user?.email && appContext?.user?.id && appContext.logout) {
                            appContext.logout()
                        }
                    }}
                    className='bg-none text-white hover:bg-bg5 w-[80px]'
                    //type='success'
                    >
                    Logout
                </Button>
            ) : (
                <Link to='/login'>
                    <Button
                        onClick={() => console.log('Button 3 clicked')}
                        className='bg-none text-white hover:bg-bg5 w-[60px]'
                        //type='success'
                    >
                    Login
                    </Button>
                </Link>
            ) }
        </div>
    </header>
    )
  )
}

export default Header
