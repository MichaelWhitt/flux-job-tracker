interface AppContextType {
    isLoggedIn: boolean
    login: (email: string, password: string) => void
    logout: () => void
    getUserDataObj: (id: string) => void
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
    applicationDate: number
    status: string
    description: string
    company: string
    applicationSite: string
    jobLevel: string
    title: string
    lastCommunication: number
    hmContactInfo: string
    notes: string
    meta_unid: string
    interviewRound: number
    salary: string
    jobLink: string
    employmentType: string
    offerDate: number
    hiringManager: string
    interestLevel: string
    location: string
    skills: string[]
    qualificationLevel: string
    id: string
  }