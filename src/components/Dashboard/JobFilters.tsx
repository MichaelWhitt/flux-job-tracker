import { useState } from 'react'
import { fireToast } from './fireToast'

interface JobFiltersProps {
    setFilteredJobs: (jobs: Array<any>) => void
    originalJobs: Array<any>
    filteredJobs: Array<any>
}

interface StatusType {
    status: 'All Jobs' | 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Closed' | 'Ghosted'
}

const JobFilters = (props: JobFiltersProps) => {
    const [statusFilter, setStatusFilter] = useState<StatusType['status']>('All Jobs')

    const filterOptions: StatusType['status'][] = [
        'All Jobs',
        'Not Applied',
        'Applied',
        'Interviewing',
        'Offer',
        'Rejected',
        'Closed',
        'Ghosted'
    ]

    const changeStatusFilter = (status: StatusType['status']) => {
        setStatusFilter(status)

        // Filter jobs based on the selected status (case-insensitive)
        const filteredJobs =
            status === 'All Jobs'
                ? props.originalJobs // Show all jobs if "All" is selected
                : props.originalJobs.filter(job => job.status?.toLowerCase() === status.toLowerCase())

        if (filteredJobs.length) {
            props.setFilteredJobs(filteredJobs)
        } else {
            fireToast({ type: 'error', content: 'No jobs match that filter, try another' })
            setStatusFilter('All Jobs')
            props.setFilteredJobs([])
        }
    }

    return (
        <div className='max-w-[350px] w-full flex flex-wrap gap-3 p-4 mr-4 rounded-lg bg-gray-950'>
            {filterOptions.map((status) => (
                <button
                    key={status}
                    onClick={() => changeStatusFilter(status)}
                    className={`${
                        statusFilter === status ? 'bg-green-600' : 'bg-gray-700'
                    }
                    text-white
                    hover:bg-green-500
                    h-[30px] w-fit p-2 rounded-md text-sm flex justify-center items-center
                    `}
                >
                    {status}
                </button>
            ))}
        </div>
    )
}

export default JobFilters
