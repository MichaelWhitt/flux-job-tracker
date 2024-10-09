import { useState } from 'react'
import { fireToast } from './fireToast'

interface JobFiltersProps {
    setFilteredJobs: (jobs: Array<JobEntry>) => void
    originalJobs: Array<JobEntry>
    filteredJobs: Array<JobEntry>
    jobFilters: {[key: string]: Array<string>}
    setJobFilters: (filter: {[key: string]: Array<string>}) => void
}

interface StatusType {
    status: 'All Jobs' | 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Closed' | 'Ghosted'
}

interface RegionType {
    region: 'All Regions' | 'Asia' | 'North America' | 'South America' | 'Africa' | 'Europe' | 'Oceania'
}

const JobFilters = (props: JobFiltersProps) => {

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

    const handleFilterChange = (type: string, value: string) => {
        if (props.jobFilters[type].includes(value)) {
            // if included in array, remove it, otherwise add it
            props.setJobFilters({...props.jobFilters, [type]: props.jobFilters[type].filter( filters => filters !== value)})
        } else {
            props.setJobFilters({...props.jobFilters, [type]: [...props.jobFilters[type], value]})
        }
    }

    return (
        <div className='max-w-[350px] w-full flex flex-wrap gap-3 p-4 mr-4 rounded-lg bg-gray-950 mt-[40px]'>
            {statusFilterOptions.map((status) => (
                <button
                    key={status}
                    onClick={() => handleFilterChange('status', status)}
                    className={`${
                        props.jobFilters.status.includes(status) ? 'bg-green-600' : 'bg-gray-700'
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
                    onClick={() => handleFilterChange('jobRegion', region)}
                    className={`${
                        props.jobFilters.jobRegion.includes(region) ? 'bg-green-600' : 'bg-gray-700'
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
