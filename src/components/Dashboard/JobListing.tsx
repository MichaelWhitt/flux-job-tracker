import JobCard from './JobCard'
import Loader from './Loader'
import JobSidebar from './Sidebar/JobSidebar'
import { useState, useContext } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { AppContext } from '../../auth/AppContext'

interface JobListingProps {
    originalJobs: Array<JobEntry>
    filteredJobs: Array<JobEntry>
}

const JobListing = (props: JobListingProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const globalContext = useContext(AppContext)
    
    let jobsToDisplay = props.originalJobs
    if (props.filteredJobs.length) {
        jobsToDisplay = props.filteredJobs
    }

    return (
        <div className='flex gap-3 flex-col items-center'>
            
            <button 
                className='mt-[40px] sm:mt-0 bg-cyan-400 text-gray-800 text-lg h-[40px] hover:bg-cyan-600 duration-500 rounded-md p-2 justify-center items-center flex'
                onClick={() => setSidebarOpen(true)}
            >
                <IconPlus size={20} /> Add Job
            </button>
            
            {jobsToDisplay?.length > 0 && jobsToDisplay?.map((job, idx) => {
                return (
                    <JobCard key={job.id || idx} job={job} />
                )
            })}
            {jobsToDisplay?.length === 0 && (
                <div className='mt-5'>
                    <Loader />
                </div>
            )}
            <JobSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} type='new' />
        </div>
    )
}

export default JobListing