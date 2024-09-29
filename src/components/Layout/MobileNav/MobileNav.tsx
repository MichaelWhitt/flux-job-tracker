import {useContext, useState} from 'react'
import { useLocation } from 'wouter'
import { 
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconHistory,
  IconSettings,
  IconLogout,
  IconListSearch,
  IconMenu2,
  IconX,
  //IconTablePlus,
  IconTextPlus
} from '@tabler/icons-react'
import {Dialog} from '@mantine/core'
import {AppContext} from '../../../auth/AppContext'
import { Button } from '../../Buttons/Button'
import { NavbarLink } from './NavbarLink'
import { Link } from 'wouter'

const MobileNav = (props) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const appContext = useContext(AppContext)
  const [location] = useLocation()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const isLoggedIn = appContext?.isLoggedIn || false

  const userInMenuModal = () => {
    if (location) {
      if (location.includes('settings')) {
        return true
      }
    }
    return false
  }

  const handleLogout = () => {
    if (appContext && appContext.logout) {
      appContext.logout()
      setLogoutModalOpen(false)
      setMoreMenuOpen(false)
    }
  }

  const renderPublicLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <NavbarLink label='Home' icon={IconHome2} linkURL='/landing' active={location.includes('landing')} />
          <NavbarLink label='Test' icon={IconHistory } linkURL='/test' active={location.includes('test')} />
          <NavbarLink label='Example' icon={IconTextPlus } linkURL='/example' active={location.includes('example')}/>
          <Link to='/login' className={'all-center'}>
            <Button onClick={() => ''}>
              Log In
            </Button>
          </Link>
        </>
      )
    }
  }

  const renderPrivateLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <NavbarLink label='Home' icon={IconHome2} linkURL='/landing' active={location.includes('landing')} />
          {/* <NavbarLink label='Test' icon={IconHistory } linkURL='/test' active={location.includes('test')} /> */}
          <NavbarLink label='Analytics' icon={IconDeviceDesktopAnalytics } linkURL='/analytics' active={location.includes('analytics')}/>
          {/* <NavbarLink label='Example' icon={IconTextPlus } linkURL='/example' active={location.includes('example')}/> */}
          {moreMenuOpen ? (
            <NavbarLink label='More' icon={IconX} linkURL='' onClick={() => {
              setMoreMenuOpen(false)
              setLogoutModalOpen(false)
            }} active={moreMenuOpen} />  
          ) : (
              <NavbarLink label='More2' icon={IconMenu2} linkURL='' onClick={() => {
                setMoreMenuOpen(true)
                setLogoutModalOpen(false)
            }} active={userInMenuModal()} />  
          )}
        </>
      )
    }
  }

  return (
    <>
    <div className='w-full h-[56px] bg-[--mantine-color-dark-9] flex justify-evenly fixed bottom-0 left-0 right-0'>
      {renderPublicLinks()}
      {renderPrivateLinks()}
    </div>
    <Dialog opened={moreMenuOpen} withCloseButton={false} position={{bottom: 70, right: 12}} style={{background: 'var(--mantine-color-dark-9)'}} styles={{root: {width: 80}}}>
        <div className='flex gap-2 flex-col'>
          <NavbarLink label='Account' icon={IconSettings} linkURL='/account' active={location.includes('account')} onClick={() => {
            setLogoutModalOpen(false)
          }} />
          <NavbarLink label='Logout' active={logoutModalOpen} icon={IconLogout} onClick={() => {
            setLogoutModalOpen(!logoutModalOpen)
            setMoreMenuOpen(false)
          }} />
        </div>
    </Dialog>
      <Dialog opened={logoutModalOpen} withCloseButton={false} position={{bottom: 70, right: 12}} className='bg-slate-600' style={{background: 'var(--mantine-color-dark-9)'}} styles={{root: {width: 200, height: 140}}}>
        <div className='flex gap-1 flex-col all-center'>
          <div className='all-center text-white font-bold'>Logout?</div>
          <Button
            className='w-[110px]'
            onClick={handleLogout}
            type='success'
          >
            Confirm
          </Button>
          <Button
            className='w-[110px]'
            onClick={() => {
              setLogoutModalOpen(false)
              setMoreMenuOpen(false)
            }}
            type='danger'
          >
            Cancel
          </Button>
          </div>
      </Dialog>
    </>
  )
}

export default MobileNav
