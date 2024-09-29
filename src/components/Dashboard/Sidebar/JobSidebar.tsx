import { SideSheet } from 'evergreen-ui'
import { useState, useEffect } from 'react'
import ViewJobSBContent from './ViewJobSBContent'
// import NewJobSBContent from './NewJobSBContent'
// import EditJobSBContent from './EditJobSBContent'
import CreateEditJobForm from './CreateEditJobForm'

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
          return <ViewJobSBContent job={job} />
          case 'new':
            return <CreateEditJobForm job={{
              company: '',
              title: '',
              location: '',
              status: 'Not Applied',
              description: '',
              applicationDate: new Date(),
              offerDate: new Date(),
              lastCommunication: new Date(),
              hiringManager: '',
              notes: '',
              salary: '',
              employmentType: 'Full-time',
              skills: [],
              jobLevel: 'Entry',
              applicationSite: '',
              jobLink: '',
              qualificationLevel: '',
              interestLevel: '',
              hmContactInfo: '',
              interviewRound: 0,
              haveReferral: false
          }} type='create' />
            case 'edit':
          return <CreateEditJobForm job={job} type='edit' />
      }
    }
  return (
    <SideSheet
      shouldCloseOnOverlayClick={type === 'view' ? true : false}
      isShown={sidebarOpen}
      onCloseComplete={() => setSidebarOpen(false)}
      width={isMobile ? 300 : 600}
    >
      {renderSidebarContext()}
    </SideSheet>
  )
}

export default JobSidebar
