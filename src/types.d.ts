interface AppContextType {
    isLoggedIn: boolean
    login: (email: string, password: string) => void
    logout: () => void
    getUserDataObj: (id: string) => void
    getPublicJobs: (collection: object) => void
    publicJobs: Array<JobEntry>
    setPublicJobs: (jobs: Array<JobEntry>) => void
    user: UserObject
    setUser: (user: UserObject) => void
    history: object
    emailVerified: boolean
    siteName: string
    rKey: string
    sortOptions: {
      sortMethod: 'Sort By' | 'Created Date' | 'Last Comms'| 'Last Updated' | 'Application Date' | 'Offer Date',
      sortType: 'asc' | 'dsc'
    }
    setSortOptions: (opts: any) => void
  }
  
  type UserObject = {
    email: string
    id: string
    emailVerified?: boolean
    jobs?: Array<JobEntry>,
    notifications?: boolean
    darkMode?: boolean
    profilePic?: string
    username?: string,
    subscribed?: boolean,
    subscriptionStart?: string,
    subscriptionEnd?: string,
    favJobs?: Array<JobEntry>
    defaultLocation?: {
      jobRegion: string,
      jobCountry: string,
      jobState: string,
      jobCity: string
    }
  }

  type JobEntry = {
    applicationDate?: string | Date
    createdDate?: string | Date
    lastUpdatedDate?: string | Date
    status: 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Withdrawn' | 'Accepted' | 'Ghosted'
    description?: string
    company: string
    applicationSite?: '' | 'LinkedIn' | 'Glassdoor' | 'Indeed' | 'Monster' | 'Hiring Cafe' | 'Angel List' | 'Company Board' | 'Other'
    jobLevel?: 'Entry' | 'Mid' | 'Senior' | 'Other'
    jobRegion: string
    jobCountry?: string
    jobState?: string
    jobCity?: string
    title: string
    lastCommunication?: string | Date
    hmContactInfo?: string
    notes?: string
    meta_unid?: string
    interviewRound?: number
    salary: string
    salaryFrequency: string
    jobLink: string
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary'
    haveReferral: boolean
    offerDate?: string | Date
    hiringManager?: string
    interestLevel?: 'Low' | 'Medium' | 'High'
    officeLocation: 'Office' | 'Hybrid' | 'Remote' | 'Unknown'
    skills?: string[]
    qualificationMatch?: 'No' | 'Low' | 'Medium' | 'High' | 'Perfect'
    id?: string
}
