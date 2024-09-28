// @ts-nocheck
import { Table, SelectField, Button, SideSheet } from 'evergreen-ui'
import {useState} from 'react'

const JobListingTable = ({jobs}) => {
    const [filtered, setFiltered] = useState(jobs)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const keyMap = {
        company: 'Company',
        title: 'Title',
        salary: 'Salary',
        location: 'Location',
        status: 'Status',
        applicationDate: 'Application Date',
        offerDate: 'Offer Date',
        lastCommunication: 'Last Communication',
        interestLevel: 'Interest Level',
        qualificationLevel: 'Qualification Level',
        hiringManager: 'Hiring Manager',
        jobLink: 'Job Link',
        applicationSite: 'Application Site',
        interviewRound: 'Interview Round',
        skills: 'Skills',
        description: 'Description',
        notes: 'Notes',
        jobLevel: 'Job Level'
    }

    const renderHighlights = (s : string) => {
        if (s === 'applied') {
            return 'warning'
        }
        if (s === 'interviewing') {
            return 'success'
        }
        if (s === 'declined' || s === 'ghosted' || s === 'withdrew') {
            return 'danger'
        } else {
            return 'none'
        }
    }

    const handleFilterMobile = (e) => {
        const val = e.target.value

        if (val === 'applied') {
            setFiltered(jobs.filter(job => job.status.toLowerCase().includes('applied')))
        } else if (val === 'remote') {
            setFiltered(jobs.filter(job => job.location.toLowerCase().includes('remote')))
        } else if (val === 'interviewing') {
            setFiltered(jobs.filter(job => job.status.toLowerCase().includes('interviewing')))
        } else if (val === 'rejected') {
            setFiltered(jobs.filter(job => job.status.toLowerCase().includes('rejected')))
        } else if (val === 'high') {
            setFiltered(jobs.filter(job => job.interestLevel.toLowerCase().includes('high')))
        } else if (val === 'qualified') {
            setFiltered(jobs.filter(job => job.qualificationLevel.toLowerCase().includes('high')))
        } else if (val === 'entry') {
            setFiltered(jobs.filter(job => job.jobLevel.toLowerCase().includes('entry')))
        } else if (val === 'mid') {
            setFiltered(jobs.filter(job => job.jobLevel.toLowerCase().includes('mid')))
        } else if (val === 'senior') {
            setFiltered(jobs.filter(job => job.jobLevel.toLowerCase().includes('senior')))
        } else {
            setFiltered(jobs)
        }
    }

    const renderStat = (name: string, val: string | number = 0, color: string) => {
        return (
            <div className={`w-full border-2 text-black font-bold h-[80px] rounded-md bg-${color}-400`}>
                <div className='bg-white h-[30px] w-full flex justify-center p-1'>
                    {name}
                </div>
                <div className='flex items-center justify-center h-[50px] '>
                    {val}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='hidden sm:block'>
                <Button onClick={() => setSidebarOpen(true)}>Show Statistics</Button>
                <SideSheet isShown={sidebarOpen} onCloseComplete={() => setSidebarOpen(false)} width={250}>
                    <div className='w-full h-full bg-slate-800 p-2 grid grid-cols-2 gap-2'>
                        {renderStat('Applied', jobs.length, 'teal')}
                        {renderStat('Interviewing', jobs.filter(j => j.status === 'interviewing').length, 'teal')}
                        {renderStat('Denied', jobs.filter(j => j.status === 'denied').lengt, 'red')}
                        {renderStat('Ghosted', jobs.filter(j => j.status === 'ghosted').length, 'red')}
                        {renderStat('Withdrew', jobs.filter(j => j.status === 'withdrew').length, 'red')}
                        {renderStat('Remote', jobs.filter(j => j.location.toLowerCase().includes('remote')).length, 'teal')}
                        {renderStat('Hybrid', jobs.filter(j => j.location.toLowerCase().includes('hybrid')).length, 'teal')}
                        {renderStat('On-Site', jobs.filter(j => j.location.toLowerCase().includes('on-site')).length, 'amber')}
                        {renderStat('Offer', jobs.filter(j => j.status === 'offer').length, 'teal')}
                    </div>
                </SideSheet>
                <Table>
                    <Table.Head>
                        {/* <Table.SearchHeaderCell /> */}
                        {Object.keys(jobs[0]).map((j, idx) => {
                            return <Table.TextHeaderCell key={j + idx}>{keyMap[j]}</Table.TextHeaderCell>
                        })}
                    </Table.Head>
                    <Table.VirtualBody height={240}>
                        {jobs.map((j, idx: number) => (
                            <Table.Row key={j.salary + idx} isSelectable onSelect={() => alert(j.company)} intent={renderHighlights(j.status)}>
                                {Object.keys(j).map((key, idx) => {
                                    if (key === 'skills') {
                                        return (
                                            <Table.TextCell key={key + idx}>
                                                {j[key].join(', ')}
                                            </Table.TextCell>
                                        )
                                    } else {
                                        return <Table.TextCell>{j[key]}</Table.TextCell>
                                    }
                                    
                                })}
                            </Table.Row>
                        ))}
                    </Table.VirtualBody>
                </Table>
            </div>
            <div className='sm:hidden grid grid-cols-1 gap-2 rounded-md'>
                <div>
                    <span className='mr-3 text-white'>Show only:</span>
                    <SelectField width={240} onChange={handleFilterMobile}>
                        <option value=''>
                            Select
                        </option>
                        <option value='applied'>
                            Applied
                        </option>
                        <option value='remote'>
                            Remote
                        </option>
                        <option value='interviewing'>
                            Interviewing
                        </option>
                        <option value='rejected'>
                            Rejected
                        </option>
                        <option value='high'>
                            High Interest
                        </option>
                        <option value='qualified'>
                            Highly Qualified
                        </option>
                        <option value='entry'>
                            Entry Level
                        </option>
                        <option value='mid'>
                            Middle Level
                        </option>
                        <option value='senior'>
                            Senior Level
                        </option>
                    </SelectField>
                    <div className='text-emerald-400 font-bold mb-5'>Showing: {filtered.length}</div>
                    <div className='flex gap-5'>
                        <Button onClick={() => setFiltered(jobs)}>Clear</Button>
                        <Button onClick={() => setSidebarOpen(true)}>Show Statistics</Button>
                    </div>
                </div>
                {filtered.map((job, idx: number) => {
                    const keys = Object.keys(job)
                    return (
                        <div className='border-2 h-fit rounded-md bg-slate-600 flex flex-col gap-3' key={job + idx}>
                            {keys.map((key, idx) => {
                                if (key === 'jobLink' || key === 'applicationSite') {
                                    let link = job[key]
                                    if (!link.includes('http')) {
                                        link = 'https://' + job[key]
                                    }
                                    return (
                                        <div className='flex flex-col p-1' key={key + idx}>
                                            <span className='bg-slate-900 text-lg text-indigo-200 font-bold p-1'>
                                                {keyMap[key]}
                                            </span>
                                            <a href={link} target='_blank' className='hover:bg-red-400 ease text-white font-bold min-h-[30px]'>
                                                {link}
                                            </a>
                                        </div>
                                    )
                                }
                                if (key === 'skills') {
                                    return (
                                        <div className='flex flex-col p-1'>
                                            <span className='bg-slate-900 text-lg text-indigo-200 font-bold p-1'>
                                                {keyMap[key]}
                                            </span>
                                        <span className='text-white min-h-[30px]'>
                                            {job[key].join(', ').toUpperCase()}
                                        </span>
                                    </div>
                                    )
                                }
                                return (
                                    <div className='flex flex-col p-1'>
                                        <span className='bg-slate-900 text-lg text-indigo-200 font-bold p-1'>
                                            {keyMap[key]}
                                        </span>
                                        <span className='text-white min-h-[30px]'>
                                            {typeof job[key] === 'string' && key !== 'notes' && key !== 'description' ? job[key].toUpperCase() : job[key]}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default JobListingTable