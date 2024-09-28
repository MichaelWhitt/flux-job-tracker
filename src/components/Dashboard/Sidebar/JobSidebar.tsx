import { SideSheet } from 'evergreen-ui'
import { useState, useEffect } from 'react'
import ViewJobSidebar from './ViewJobSidebar'
import NewJobSidebar from './NewJobSidebar'

interface JobSidebar {
    job?: any
    sidebarOpen: boolean
    setSidebarOpen: (isOpen: boolean) => void
    type: 'view' | 'new' | 'edit'
}

const JobSidebar = ({ job, sidebarOpen, setSidebarOpen, type }: JobSidebar) => {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkIfMobile()
      window.addEventListener('resize', checkIfMobile)
      return () => window.removeEventListener('resize', checkIfMobile)
    }, [])


    const renderSidebarContext = () => {
      switch (type) {
        case 'view':
          return <ViewJobSidebar job={job} />
          case 'new':
            return <NewJobSidebar />
            case 'edit':
          return <ViewJobSidebar job={job} />
      }
    }
  return (
    <SideSheet
      isShown={sidebarOpen}
      onCloseComplete={() => setSidebarOpen(false)}
      width={isMobile ? 300 : 600}
    >
      {renderSidebarContext()}
    </SideSheet>
  )
}

export default JobSidebar
