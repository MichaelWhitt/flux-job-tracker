import { SideSheet } from 'evergreen-ui'
import { useState, useEffect } from 'react'
import ViewJobSBContent from './ViewJobSBContent'
// import NewJobSBContent from './NewJobSBContent'
// import EditJobSBContent from './EditJobSBContent'
import CreateEditJobForm from './CreateEditJobForm'
import { generateUnid } from '../../../utils/utils'

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
              applicationDate: '',
              offerDate: '',
              lastCommunication: '',
              hiringManager: '',
              notes: '',
              salary: '',
              employmentType: 'Full-time',
              skills: [],
              jobLevel: 'Entry',
              meta_unid: generateUnid(),
              applicationSite: '',
              jobLink: '',
              officeLocation: 'Office',
              qualificationMatch: 'Medium',
              interestLevel: 'Medium',
              hmContactInfo: '',
              interviewRound: 0,
              haveReferral: false
            }} 
            type='create' 
          />
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
