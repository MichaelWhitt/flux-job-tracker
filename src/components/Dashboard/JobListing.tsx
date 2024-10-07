import JobCard from './JobCard/JobCard'
import Loader from './Loader'
import JobSidebar from './Sidebar/JobSidebar'
import { useState, useContext } from 'react'
import { AppContext } from '../../auth/AppContext'
import DashHeader from './DashHeader/DashHeader'

interface JobListingProps {
    originalJobs: Array<JobEntry>
    filteredJobs: Array<JobEntry>
}

const JobListing = (props: JobListingProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const globalContext = useContext(AppContext)
    const [mounted, setMounted] = useState(false)
    
    let jobsToDisplay = props.originalJobs
    if (props.filteredJobs.length) {
        jobsToDisplay = props.filteredJobs
    }

    setTimeout(() => {
        if (jobsToDisplay.length === 0) {
            setMounted(true)
        }
    }, 1000)

    return (
        <div className='flex gap-3 flex-col items-center'>
            <DashHeader 
                sideBarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen} 
                filteredJobs={props.filteredJobs} 
                originalJobs={props.originalJobs} 
            />
            {jobsToDisplay?.length > 0 && jobsToDisplay?.map((job, idx) => {
                return (
                    <JobCard key={job.id || idx} job={job} />
                )
            })}
            {!mounted && (
                <div className='mt-5'>
                    <Loader />
                </div>
            )}
            {mounted && jobsToDisplay.length === 0 && (
                <div>
                    No jobs match that filter. Create a new job.
                </div>
            )}
            <JobSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} type='new' />
        </div>
    )
}

export default JobListing