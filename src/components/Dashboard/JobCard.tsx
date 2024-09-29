import React, { useState } from 'react'
import JobSidebar from './Sidebar/JobSidebar'
import { formatDate, isOnMobile } from '../../utils/utils'

interface JobCardProps {
  job: JobEntry
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

  const renderDate = (d: number) => {
    return formatDate(d * 1000)
  }

  const renderText = (t: string, cutoff: number) => {
    if (t) {
      const truncatedText = t.length > cutoff ? `${t.slice(0, cutoff)}...` : (t || 'N/A')
  
      return (
        <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
          {truncatedText}
        </div>
      )
    }
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
      <div className='flex justify-between items-center'>
        <h2 className='text-md sm:text-md font-bold'>{renderText(job.title, isOnMobile ? 25 : 45) || 'N/A'}</h2>
        <p className='text-xs sm:text-md text-gray-400'>{renderDate(job.applicationDate) || 'N/A'}</p>
      </div>
      <div>
        <span className='text-xs sm:text-md text-gray-400 mb-2'>{renderText(job.company, 30) || 'N/A'}</span>
      </div>
      <div className='flex justify-between items-center sm:mb-2 text-xs sm:text-md mt-3'>
        <span>{renderText(job.location, 15) || 'N/A'}</span>
        <span className='flex'>${renderText(job.salary, 8) || 'N/A'}</span>
        <span className={`p-1  ` + statusColorMap[job.status?.toLowerCase()]}>{renderText(job.status, 20) || 'N/A'}</span>
      </div>
      <p className='text-xs sm:text-md overflow-hidden text-ellipsis hidden sm:flex'>{renderText(job.description, 100) || 'N/A'}</p>
      <JobSidebar job={job} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} type={'view'} />
    </div>
  )
}

export default JobCard