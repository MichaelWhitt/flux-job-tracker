import { SideSheet } from 'evergreen-ui'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../auth/AppContext'
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
    const globalContext = useContext(AppContext)
    const userObj = globalContext?.user

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
              status: 'Not Applied',
              description: '',
              applicationDate: '',
              offerDate: '',
              lastCommunication: '',
              hiringManager: '',
              notes: '',
              salary: '',
              salaryFrequency: 'yr',
              employmentType: 'Full-time',
              skills: [],
              jobLevel: 'Entry',
              jobRegion: userObj?.defaultLocation?.jobRegion || '',
              jobCountry: userObj?.defaultLocation?.jobCountry || '',
              jobState: userObj?.defaultLocation?.jobState || '',
              jobCity: userObj?.defaultLocation?.jobCity || '',
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
      width={isMobile ? 350 : 600}
    >
      {renderSidebarContext()}
    </SideSheet>
  )
}

export default JobSidebar
