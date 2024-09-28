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
    favoriteLists?: array
    notifications?: boolean
    darkMode?: boolean
    profilePic?: string
    username?: string,
    subscribed?: boolean,
    subscriptionStart?: string,
    subscriptionEnd?: string,
    favJobs?: Array<string>
  }