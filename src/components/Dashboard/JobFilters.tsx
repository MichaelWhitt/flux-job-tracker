import { useState } from 'react'
import { fireToast } from './fireToast'

interface JobFiltersProps {
    setFilteredJobs: (jobs: Array<JobEntry>) => void
    originalJobs: Array<JobEntry>
    filteredJobs: Array<JobEntry>
}

interface StatusType {
    status: 'All Jobs' | 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Closed' | 'Ghosted'
}

interface RegionType {
    region: 'All Regions' | 'Asia' | 'North America' | 'South America' | 'Africa' | 'Europe' | 'Oceania'
}

const JobFilters = (props: JobFiltersProps) => {
    const [statusFilter, setStatusFilter] = useState<StatusType['status']>('All Jobs')
    const [regionFilter, setRegionFilter] = useState<RegionType['region']>('All Regions')

    const statusFilterOptions: StatusType['status'][] = [
        'All Jobs',
        'Not Applied',
        'Applied',
        'Interviewing',
        'Offer',
        'Rejected',
        'Closed',
        'Ghosted'
    ]

    const regionFilterOptions: RegionType['region'][] = [
        'All Regions',
        'Asia',
        'North America',
        'South America',
        'Africa',
        'Europe',
        'Oceania'
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

    const changeLocationFilter = (region: RegionType['region']) => {
        setRegionFilter(region)

        // Filter jobs based on the selected status (case-insensitive)
        const filteredJobs =
            region === 'All Regions'
                ? props.originalJobs // Show all jobs if "All" is selected
                : props.originalJobs.filter(job => job.jobRegion?.toLowerCase() === region.toLowerCase())

        if (filteredJobs.length) {
            props.setFilteredJobs(filteredJobs)
        } else {
            fireToast({ type: 'error', content: 'No jobs match that filter, try another' })
            setStatusFilter('All Jobs')
            props.setFilteredJobs([])
        }
    }

    return (
        <div className='max-w-[350px] w-full flex flex-wrap gap-3 p-4 mr-4 rounded-lg bg-gray-950 mt-[40px]'>
            {statusFilterOptions.map((status) => (
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
            <hr className='text-blue-100 w-full h-[5px]' />
            {regionFilterOptions.map((region) => (
                <button
                    key={region}
                    onClick={() => changeLocationFilter(region)}
                    className={`${
                        regionFilter === region ? 'bg-green-600' : 'bg-gray-700'
                    }
                    text-white
                    hover:bg-green-500
                    h-[30px] w-fit p-2 rounded-md text-sm flex justify-center items-center
                    `}
                >
                    {region}
                </button>
            ))}
        </div>
    )
}

export default JobFilters
