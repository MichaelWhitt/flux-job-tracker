import { useState } from 'react'
import { fireToast } from './fireToast'
import JobFilter from './JobFilters/JobFilter'

interface JobFiltersProps {
    setFilteredJobs: (jobs: Array<JobEntry>) => void
    originalJobs: Array<JobEntry>
    filteredJobs: Array<JobEntry>
    jobFilters: {[key: string]: Array<string>}
    setJobFilters: (filter: {[key: string]: Array<string>}) => void
    clearFilters: () => void
    filterCount: number
}

interface FilterType {
    status: 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Closed' | 'Ghosted'
    region: 'Asia' | 'North America' | 'South America' | 'Africa' | 'Europe' | 'Oceania'
    applicationSite: 'LinkedIn'| 'Indeed'| 'Monster'| 'Glassdoor'| 'Hiring Cafe'| 'Angel List'| 'Robert Half'| 'Tek Systems'| 'Cyber Coders'| 'Company Board'| 'Other'
    officeLocation: 'Office' | 'Hybrid' | 'Remote'
    interestLevel: 'Low' | 'Medium' | 'High'
    qualificationMatch: 'Low' | 'Medium' | 'High'
    jobLevel: 'Junior' | 'Medior' | 'Senior'
}

const JobFilters = (props: JobFiltersProps) => {

    const statusFilterOptions: FilterType['status'][] = [
        'Not Applied',
        'Applied',
        'Interviewing',
        'Offer',
        'Rejected',
        'Closed',
        'Ghosted'
    ]

    const regionFilterOptions: FilterType['region'][] = [
        'Asia',
        'North America',
        'South America',
        'Africa',
        'Europe',
        'Oceania'
    ]

    const applicationSiteFilterOptions: FilterType['applicationSite'][] = [
        'LinkedIn',
        'Indeed',
        'Monster',
        'Glassdoor',
        'Hiring Cafe',
        'Angel List',
        'Robert Half',
        'Tek Systems',
        'Cyber Coders',
        'Company Board',
        'Other'
    ]

    const officeLocationFilterOptions: FilterType['officeLocation'][] = [
        'Office',
        'Hybrid',
        'Remote'
    ]

    const interestLevelFilterOptions: FilterType['interestLevel'][] = [
        'Low',
        'Medium',
        'High',
      ]
      
      const qualificationMatchFilterOptions: FilterType['qualificationMatch'][] = [
        'Low',
        'Medium',
        'High',
      ]
      
      const jobLevelFilterOptions: FilterType['jobLevel'][] = ['Junior', 'Medior', 'Senior']

    const handleFilterChange = (type: string, value: string) => {
        if (props.jobFilters[type].includes(value)) {
            // if included in array, remove it, otherwise add it
            props.setJobFilters({...props.jobFilters, [type]: props.jobFilters[type].filter( filters => filters !== value)})
        } else {
            props.setJobFilters({...props.jobFilters, [type]: [...props.jobFilters[type], value]})
        }
    }

    return (
        <div className='p-4 mr-4 rounded-lg bg-gray-950 flex flex-col relative'>
            {props.filterCount > 0 && (
                <div className='flex gap-1 ml-auto items-center absolute right-5'>
                    <button onClick={props.clearFilters} className='bg-red-500 hover:bg-red-700 duration-500 p-1 rounded-md'>
                        Clear Filters ({props.filterCount})
                    </button>
                </div>
            )}
            <JobFilter
                initialOpen
                filterType='status'
                filterLabel='Status'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={statusFilterOptions}
            />
            
            <JobFilter
                filterType='jobRegion'
                filterLabel='Region'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={regionFilterOptions}
            />
            
            <JobFilter
                filterType='applicationSite'
                filterLabel='Application Site'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={applicationSiteFilterOptions}
            />
            
            <JobFilter
                filterType='officeLocation'
                filterLabel='Office Location'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={officeLocationFilterOptions}
            />
            
            <JobFilter
                filterType='interestLevel'
                filterLabel='Interest Level'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={interestLevelFilterOptions}
            />
            
            <JobFilter
                filterType='qualificationMatch'
                filterLabel='Qualification Match'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={qualificationMatchFilterOptions}
            />
            
            <JobFilter
                filterType='jobLevel'
                filterLabel='Job Level'
                jobFilters={props.jobFilters}
                handleFilterChange={handleFilterChange}
                filterKeys={jobLevelFilterOptions}
            />
</div>
    )
}

export default JobFilters
