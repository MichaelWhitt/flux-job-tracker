import { useState, useContext } from 'react'
import { TextInputField, Textarea } from 'evergreen-ui'
import { fireToast } from '../fireToast'
import { updateUserJobEntry, updatePublicJobEntry, getAllJobs } from '../../../utils/api'
import { AppContext } from '../../../auth/AppContext'
import Loader from '../Loader'
import { collection } from 'firebase/firestore'
import { db } from '../../../firebase-config'

interface EditJobForm {
    company: string
    title: string
    location: string
    status: string
    applicationDate: string // Changed to string format
    offerDate: string // Changed to string format
    lastCommunication: string // Changed to string format
    description: string
    hiringManager: string
    notes: string
    salary: string
    skills: string[]
    jobLevel: string
    employmentType: string
    applicationSite: string
    jobLink: string
    qualificationLevel: string
    interestLevel: string
    hmContactInfo: string
    interviewRound: number
}

interface EditJobSBContentProps {
    job: JobEntry
}

const EditJobSBContent: React.FC = (props: EditJobSBContentProps) => {
    const currentDate = new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
    const [formData, setFormData] = useState<EditJobForm>({...props.job})
    const [showOptionalFields, setShowOptionalFields] = useState(false)
    const globalContext = useContext(AppContext)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const jobsCollections = collection(db, 'jobs')
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value).getTime() / 1000 // Get time in seconds
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: selectedDate,
        }))
    }

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.split(',').map(skill => skill.trim())
        setFormData((prev) => ({
            ...prev,
            skills: value,
        }))
    }

    const handleSubmit = async () => {
        // Convert applicationDate, offerDate, and lastCommunication to UNIX timestamp here
        setFormSubmitting(true)

        const newApplicationDate = formData.applicationDate ? Math.floor(new Date(formData.applicationDate).getTime()) : null
        const newOfferDate = formData.offerDate ? Math.floor(new Date(formData.offerDate).getTime()) : null
        const newLastCommunication = formData.lastCommunication ? Math.floor(new Date(formData.lastCommunication).getTime()) : null
        console.log({newApplicationDate})

        const submittedData = {
            ...formData,
            applicationDate: newApplicationDate,
            offerDate: newOfferDate,
            lastCommunication: newLastCommunication,
        }

        if (!formData.company || !formData.salary || !formData.title || !formData.status || !formData.location) {
            fireToast({type: 'error', content: 'Fill out required fields'})
        } else {
            if (globalContext?.user && globalContext.isLoggedIn) {
                try {
                    await updateUserJobEntry(globalContext.user?.id, {...submittedData})
                    setFormSubmitting(false)
                    setFormData({
                        company: '',
                        title: '',
                        location: '',
                        status: 'not applied',
                        description: '',
                        applicationDate: currentDate, // Use string format
                        offerDate: currentDate, // Use string format
                        lastCommunication: currentDate, // Use string format
                        hiringManager: '',
                        notes: '',
                        salary: '',
                        employmentType: '',
                        skills: [],
                        jobLevel: '',
                        applicationSite: '',
                        jobLink: '',
                        qualificationLevel: '',
                        interestLevel: '',
                        hmContactInfo: '',
                        interviewRound: 0,
                    })
                    globalContext?.getUserDataObj(globalContext.user.id)
                } catch(e) {
                    fireToast({type: 'error', content: JSON.stringify(e)})
                    setFormSubmitting(false)
                }
            } else {
                await updatePublicJobEntry(props.job?.id || '', submittedData)
                setFormSubmitting(false) 
                globalContext?.getPublicJobs(jobsCollections)
            }
        }
    }

    return (
        <div className='bg-gray-900 p-6 text-gray-100 min-h-full'>
            <h2 className='mb-4 text-white text-center text-2xl'>Edit Job</h2>
            <div className='flex flex-col'>
                <div className='grid sm:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor='company' className='text-white'>Company</label>
                        <TextInputField
                            isInvalid={!formData.company}
                            name='company'
                            placeholder='Company'
                            value={formData.company}
                            onChange={handleChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>
                    
                    <div className='flex flex-col'>
                        <label htmlFor='title' className='text-white'>Job Title</label>
                        <TextInputField
                            isInvalid={!formData.title }
                            name='title'
                            placeholder='Title'
                            value={formData.title}
                            onChange={handleChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor='location' className='text-white'>Job Location</label>
                        <TextInputField
                            isInvalid={!formData.location }
                            name='location'
                            placeholder='Location'
                            value={formData.location}
                            onChange={handleChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>

                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='status' className='text-white'>Application Status</label>
                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            className='h-[40px] bg-gray-800 rounded-md p-2 w-fit'
                        >
                            <option value='not applied'>Not Applied</option>
                            <option value='applied'>Applied</option>
                            <option value='interviewing'>Interviewing</option>
                            <option value='offer'>Offer</option>
                            <option value='rejected'>Rejected</option>
                        </select>
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor='applicationDate' className='text-white'>Application Date</label>
                        <TextInputField
                            isInvalid={!formData.applicationDate}
                            type='date'
                            name='applicationDate'
                            value={typeof formData.applicationDate === 'number' ? new Date(formData.applicationDate * 1000).toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>
                    
                    <div className='flex flex-col '>
                        <label htmlFor='salary' className='text-white'>Salary</label>
                        <TextInputField
                            isInvalid={!formData.salary}
                            name='salary'
                            placeholder='Salary'
                            value={formData.salary}
                            onChange={handleChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>

                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='employmentType' className='text-white'>Employment Type</label>
                        <select
                            name='employmentType'
                            value={formData.employmentType}
                            onChange={handleChange}
                            className='h-[40px] bg-gray-800 rounded-md p-2 w-fit'
                        >
                            <option value='Full-time'>Full-time</option>
                            <option value='Part-time'>Part-time</option>
                            <option value='Contract'>Contract</option>
                        </select>
                    </div>

                </div>
                {/*Mandatory Fields Above*/}

                <button className='mb-5 bg-cyan-400 h-[40px] hover:bg-cyan-600 text-black w-fit  p-2 rounded-md text-center duration-500' onClick={() => setShowOptionalFields(!showOptionalFields)}>
                    {showOptionalFields ? 'Hide Optional Fields' : 'Show Optional Fields'}
                </button>
                {showOptionalFields && <hr />}

                {showOptionalFields && (
                    <div className='grid sm:grid-cols-2 gap-2 mt-5'>
                        {formData.status?.toLowerCase() === 'offer' && (
                            <div className='flex flex-col'>
                                <label htmlFor='offerDate' className='text-white'>Offer Date</label>
                                <TextInputField
                                    type='date'
                                    name='offerDate'
                                    value={typeof formData.offerDate === 'number' ? new Date(formData.offerDate * 1000).toISOString().split('T')[0] : ''}
                                    onChange={handleDateChange}
                                    style={{background: '#1F2937', color: '#fff'}}
                                />
                            </div>
                        )}

                        <div className={`flex flex-col ${formData.status?.toLowerCase() === 'offer' ? 'mt-0' : ''}`}>
                            <label htmlFor='lastCommunication' className='text-white'>Last Communication</label>
                            <TextInputField
                                type='date'
                                name='lastCommunication'
                                value={typeof formData.lastCommunication === 'number' ? new Date(+formData.lastCommunication * 1000).toISOString().split('T')[0] : ''}
                                onChange={handleDateChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='hiringManager' className='text-white'>Hiring Manager</label>
                            <TextInputField
                                name='hiringManager'
                                placeholder='Hiring Manager'
                                value={formData.hiringManager}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='hmContactInfo' className='text-white'>Hiring Manager Contact</label>
                            <TextInputField
                                name='hmContactInfo'
                                placeholder='Contact Info'
                                value={formData.hmContactInfo}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col mb-5'>
                            <label htmlFor='description' className='text-white'>Job Description</label>
                            <Textarea
                                name='description'
                                placeholder='Job Description'
                                value={formData.description}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col mb-5'>
                            <label htmlFor='notes' className='text-white'>Notes</label>
                            <Textarea
                                name='notes'
                                placeholder='Notes'
                                value={formData.notes}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='skills' className='text-white'>Skills (comma separated)</label>
                            <TextInputField
                                name='skills'
                                placeholder='e.g. React, TypeScript, Git'
                                value={formData.skills.join(', ')}
                                onChange={handleSkillsChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='jobLevel' className='text-white'>Job Level</label>
                            <TextInputField
                                name='jobLevel'
                                placeholder='e.g. Entry, Middle, Senior'
                                value={formData.jobLevel}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='applicationSite' className='text-white'>Application Site</label>
                            <TextInputField
                                name='applicationSite'
                                placeholder='e.g. LinkedIn, Indeed, Company Website'
                                value={formData.applicationSite}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='jobLink' className='text-white'>Job Link</label>
                            <TextInputField
                                name='jobLink'
                                placeholder='URL to the job listing'
                                value={formData.jobLink}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='qualificationLevel' className='text-white'>Qualification Level</label>
                            <TextInputField
                                name='qualificationLevel'
                                placeholder='Qualification Level Match'
                                value={formData.qualificationLevel}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='interestLevel' className='text-white'>Interest Level</label>
                            <TextInputField
                                name='interestLevel'
                                placeholder='Interest Level'
                                value={formData.interestLevel}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='interviewRound' className='text-white'>Interview Round</label>
                            <TextInputField
                                type='number'
                                name='interviewRound'
                                placeholder='Round number'
                                value={formData.interviewRound}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={formSubmitting ? () => '' : handleSubmit}
                    className='h-[40px] bg-green-500 hover:bg-green-700 text-black w-fit mt-4 p-2 rounded-md text-center duration-500'
                    disabled={formSubmitting}
                >
                    {formSubmitting ? <Loader /> : 'Submit'}
                </button>
            </div>
        </div>
    )
}

export default EditJobSBContent
