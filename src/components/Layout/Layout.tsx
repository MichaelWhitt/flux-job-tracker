import Header from './Header/Header'
import Footer from './Footer/Footer'
// import { Sidebar } from '../Sidebar/Sidebar'
import MobileNav from './MobileNav/MobileNav'
import { isOnMobile } from '../../utils/utils'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

    
    return (
        <div className={`flex h-full w-full flex-col`}>
            <Header />
            <div className={`text-white mt-[58px] min-h-screen sm:p-4 ${isOnMobile ? 'mb-[50px]' : ''} `}>
                {props.children}
            </div>
            <Footer />
            {isOnMobile && <MobileNav />}

        </div>
    )
}

export default Layout