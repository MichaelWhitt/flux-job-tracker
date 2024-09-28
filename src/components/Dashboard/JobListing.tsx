import JobCard from './JobCard'
import Loader from './Loader'
import JobSidebar from './Sidebar/JobSidebar'
import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'

interface JobListingProps {
    originalJobs: Array<any>
    filteredJobs: Array<any>
}

const JobListing = (props: JobListingProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
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
            
            {jobsToDisplay?.length === 0 && <Loader />}
            <JobSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} type='new' />
        </div>
    )
}

export default JobListing