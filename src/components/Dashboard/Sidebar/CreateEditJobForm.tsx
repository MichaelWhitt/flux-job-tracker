import { useState, useContext } from 'react'
import { TextInputField, Textarea, Switch } from 'evergreen-ui'
import { fireToast } from '../fireToast'
import { updateUserJobEntry, updatePublicJobEntry } from '../../../utils/api'
import { AppContext } from '../../../auth/AppContext'
import { collection } from 'firebase/firestore'
import { db } from '../../../firebase-config'

interface CreateEditJobSBContentProps {
    job: JobEntry
    type: 'create' | 'edit'
}

const CreateEditJobForm: React.FC<CreateEditJobSBContentProps> = (props) => {
    const currentDate = new Date().toISOString().split('T')[0]
    const [formData, setFormData] = useState<JobEntry>({...props.job, applicationDate: currentDate, lastCommunication: currentDate})
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

    const handleSwitchChange = (e: {target: {name: string, checked: boolean}}) => {
        const { name, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value 
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
        setFormSubmitting(true)

        const submittedData = {
            ...formData
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
                        status: 'Not Applied',
                        description: '',
                        applicationDate: currentDate,
                        offerDate: '',
                        lastCommunication: currentDate,
                        hiringManager: '',
                        notes: '',
                        salary: '',
                        employmentType: 'Full-time',
                        skills: [],
                        jobLevel: 'Mid',
                        applicationSite: '',
                        jobLink: '',
                        qualificationMatch: 'Medium',
                        interestLevel: 'Medium',
                        hmContactInfo: '',
                        interviewRound: 0,
                        haveReferral: false
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
            <h2 className='mb-4 text-white text-center text-2xl'>
                {props.type === 'create' ? 'Create Job' : 'Edit Job'}
            </h2>
            <div className='flex flex-col'>
                <div className='grid sm:grid-cols-2 gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor='company' className='text-white'>Company</label>
                        <TextInputField
                            label=''
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
                            label=''
                            isInvalid={!formData.title}
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
                            label=''
                            isInvalid={!formData.location}
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
                            className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                        >
                            <option value='Not Applied'>Not Applied</option>
                            <option value='Applied'>Applied</option>
                            <option value='Interviewing'>Interviewing</option>
                            <option value='Offer'>Offer</option>
                            <option value='Rejected'>Rejected</option>
                            <option value='Rejected'>Withdrawn</option>
                            <option value='Rejected'>Ghosted</option>
                        </select>
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor='applicationDate' className='text-white'>Application Date</label>
                        <TextInputField
                            label=''
                            isInvalid={!formData.applicationDate}
                            type='date'
                            name='applicationDate'
                            value={formData.applicationDate} 
                            onChange={handleDateChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor='jobLink' className='text-white'>Job Link</label>
                        <TextInputField
                            label=''
                            isInvalid={!formData.jobLink}
                            name='jobLink'
                            placeholder='URL to the job listing'
                            value={formData.jobLink}
                            onChange={handleChange}
                            style={{background: '#1F2937', color: '#fff'}}
                        />
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor='salary' className='text-white'>Salary</label>
                        <TextInputField
                            label=''
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
                            className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                        >
                            <option value='Full-time'>Full-time</option>
                            <option value='Part-time'>Part-time</option>
                            <option value='Contract'>Contract</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='haveReferral' className='text-white'>Have Referral?</label>
                        <Switch
                            name='haveReferral'
                            checked={formData.haveReferral}
                            onChange={handleSwitchChange}
                            height={20}
                        />
                    </div>

                </div>
                {/* Mandatory Fields Above */}

                <button className='mb-5 bg-cyan-400 h-[40px] hover:bg-cyan-600 text-black w-fit  p-2 rounded-md text-center duration-500' onClick={() => setShowOptionalFields(!showOptionalFields)}>
                    {showOptionalFields ? 'Hide Optional Fields' : 'Show Optional Fields'}
                </button>
                {showOptionalFields && <hr />}

                {showOptionalFields && (
                    <div className='grid sm:grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='description' className='text-white'>Job Description</label>
                            <Textarea
                                name='description'
                                placeholder='Description'
                                value={formData.description}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='hiringManager' className='text-white'>Hiring Manager</label>
                            <TextInputField
                                label=''
                                name='hiringManager'
                                placeholder='Hiring Manager'
                                value={formData.hiringManager}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col'>
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
                            <label htmlFor='interviewRound' className='text-white'>Interview Round</label>
                            <TextInputField
                                label=''
                                type='number'
                                min='0'
                                name='interviewRound'
                                placeholder='Interview Round'
                                value={formData.interviewRound}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='lastCommunication' className='text-white'>Last Communication</label>
                            <TextInputField
                                label=''
                                type='date'
                                name='lastCommunication'
                                value={formData.lastCommunication} 
                                onChange={handleDateChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        {formData.status?.toLowerCase() === 'offer' && (
                            <div className='flex flex-col'>
                                <label htmlFor='offerDate' className='text-white'>Offer Date</label>
                                <TextInputField
                                    label=''
                                    type='date'
                                    name='offerDate'
                                    value={formData.offerDate} 
                                    onChange={handleDateChange}
                                    style={{background: '#1F2937', color: '#fff'}}
                                />
                            </div>
                        )}

                        <div className='flex flex-col'>
                            <label htmlFor='skills' className='text-white'>Skills</label>
                            <TextInputField
                                label=''
                                name='skills'
                                placeholder='React, Typescript, Git'
                                value={formData.skills.join(', ')}
                                onChange={handleSkillsChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>

                        <div className='flex flex-col gap-2 mb-5'>
                            <label htmlFor='jobLevel' className='text-white'>Job Level</label>
                            <select
                                name='jobLevel'
                                value={formData.jobLevel}
                                onChange={handleChange}
                                className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                            >
                                <option value='Entry'>Entry</option>
                                <option value='Mid'>Mid</option>
                                <option value='Senior'>Senior</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 mb-5'>
                            <label htmlFor='qualificationMatch' className='text-white'>Qualification Match</label>
                            <select
                                name='qualificationMatch'
                                value={formData.qualificationMatch || 'Medium'}
                                onChange={handleChange}
                                className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                            >
                                <option value='No'>No Match</option>
                                <option value='Low'>Low Match</option>
                                <option value='Medium'>Medium Match</option>
                                <option value='High'>High Match</option>
                                <option value='Perfect'>Perfect Match</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 mb-5'>
                            <label htmlFor='applicationSite' className='text-white'>Application Site</label>
                            <select
                                name='applicationSite'
                                value={formData.applicationSite}
                                onChange={handleChange}
                                className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                            >
                                <option value=''>Choose</option>
                                <option value='LinkedIn'>LinkedIn</option>
                                <option value='Indeed'>Indeed</option>
                                <option value='Monster'>Monster</option>
                                <option value='Hiring Cafe'>Hiring Cafe</option>
                                <option value='Angel List'>Angel List</option>
                                <option value='Company Board'>Company Board</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor='interestLevel' className='text-white'>Interest Level</label>
                            <select
                                name='interestLevel'
                                value={formData.interestLevel || 'Medium'}
                                onChange={handleChange}
                                className='h-[34px] bg-gray-800 rounded-md p-2 w-fit text-sm'
                            >
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='hmContactInfo' className='text-white'>
                                Hiring Manager Contact Info
                            </label>
                            <TextInputField
                                label=''
                                name='hmContactInfo'
                                placeholder='Contact Info'
                                value={formData.hmContactInfo}
                                onChange={handleChange}
                                style={{background: '#1F2937', color: '#fff'}}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={formSubmitting}
                    className='mt-4 bg-green-500 p-2 rounded hover:bg-green-700 duration-300 text-white'
                >
                    {formSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    )
}

export default CreateEditJobForm
