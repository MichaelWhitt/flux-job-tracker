import React, { useState } from 'react'
import JobSidebar from './Sidebar/JobSidebar'

interface Job {
  applicationDate: string
  status: string
  description: string
  company: string
  applicationSite: string
  jobLevel: string
  title: string
  lastCommunication: string
  hmContactInfo: string
  notes: string
  interviewRound: number
  salary: string
  jobLink: string
  offerDate: string
  hiringManager: string
  interestLevel: string
  location: string
  skills: string[]
  qualificationLevel: string
  id: string
}

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    console.log(`Job Title: ${job.title || 'N/A'}`)
    setSidebarOpen(true)
  }

  const statusColorMap = {
    'applied' : 'outline outline-green-700',
    'not applied' : 'outline outline-red-700',
    'offer' : 'bg-green-700',
    'interviewing' : 'bg-orange-500',
    'ghosted' : 'bg-red-700',
    'rejected' : 'bg-red-700',
    'closed' : 'bg-red-700',
  }

  return (
    <div 
      className={`
        bg-gray-800 text-white p-2 rounded-lg shadow-md
        w-full sm:h-[120px] h-fit
        transition-all duration-300 ease-in-out
        ${isHovered ? 'bg-gray-900 transform -translate-y-1' : ''}
        overflow-hidden cursor-pointer
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-xl font-bold'>{job.title || 'N/A'}</h2>
        <p className='text-sm text-gray-400'>{job.applicationDate || 'N/A'}</p>
      </div>
      <div className='flex justify-between items-center sm:mb-2 text-sm'>
        <span>{job.company || 'N/A'}</span>
        <span>{job.location || 'N/A'}</span>
        <span>${job.salary || 'N/A'}</span>
        <span className={`p-1  ` + statusColorMap[job.status?.toLowerCase()]}>
            {job.status || 'N/A'}
        </span>
      </div>
      <p className='text-sm overflow-hidden text-ellipsis hidden sm:flex'>{job.description || 'N/A'}</p>
      <JobSidebar job={job} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} type={'view'} />
    </div>
  )
}

export default JobCard