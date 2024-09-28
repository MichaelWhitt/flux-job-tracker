import JobListing from './JobListing.js'
import JobFilters from './JobFilters.js'
import { useState, useEffect } from 'react'
import NewJobForm from './NewJobForm.js'

interface DashboardProps {
    jobs: Array<any>
}

const Landing = (props: DashboardProps) => {
    const [originalJobs, setoriginalJobs] = useState<Array<any>>([])
    const [filteredJobs, setFilteredJobs] = useState<Array<any>>([])

    useEffect(() => {
        if (!originalJobs.length && props.jobs?.length) {
            setoriginalJobs(props.jobs)
        }
    }, [props.jobs])

    return (
        <div className='p-2'>
                <>
                    <h1 className='text-white font-bold text-3xl flex justify-center sm:mb-[100px] mb-[40px]'>Dashboard</h1>
                    <div className='flex w-3/4 m-auto sm:flex-row flex-col'>
                        <div className='flex-shrink-0'> {/* Prevents JobFilters from shrinking */}
                            <JobFilters originalJobs={originalJobs} filteredJobs={filteredJobs} setFilteredJobs={setFilteredJobs} />
                        </div>
                        <div className='flex-grow'> {/* Allows JobListing to take the remaining space */}
                            <JobListing originalJobs={originalJobs} filteredJobs={filteredJobs} />
                        </div>
                    </div>
                </>
        </div>
    )
}

export default Landing
