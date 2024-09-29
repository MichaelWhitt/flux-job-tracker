interface AppContextType {
    isLoggedIn: boolean
    login: (email: string, password: string) => void
    logout: () => void
    getUserDataObj: (id: string) => void
    getPublicJobs: (collection: object) => void
    publicJobs: Array<JobEntry>
    user: UserObject
    history: object
    emailVerified: boolean
    siteName: string
    rKey: string
  }
  
  type UserObject = {
    email: string
    id: string
    emailVerified?: boolean
    jobs: Array<JobEntry>,
    notifications?: boolean
    darkMode?: boolean
    profilePic?: string
    username?: string,
    subscribed?: boolean,
    subscriptionStart?: string,
    subscriptionEnd?: string,
    favJobs?: Array<JobEntry>
  }

  type JobEntry = {
    applicationDate: number | string | Date
    status: 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Withdrawn' | 'Accepted' | 'Ghosted'
    description: string
    company: string
    applicationSite: '' | 'LinkedIn' | 'Indeed' | 'Monster' | 'Hiring Cafe' | 'Angel List' | 'Company Board' | 'Other'
    jobLevel: 'Entry' | 'Mid' | 'Senior' | 'Other'
    title: string
    lastCommunication: number | string | Date
    hmContactInfo: string
    notes: string
    meta_unid?: string
    interviewRound: number
    salary: string
    jobLink: string
    employmentType: string
    haveReferral: boolean
    offerDate: number | string | Date
    hiringManager: string
    interestLevel: string
    location: string
    skills: string[]
    qualificationLevel: 'No Match' | 'Low Match' | 'Mid Match' | 'High Match' | 'Perfect Match'
    id?: string
}
