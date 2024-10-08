import { db, logout } from '../firebase-config'
import {collection, getDocs, updateDoc, doc, getDoc, deleteDoc, addDoc, setDoc, query, where, limit, arrayUnion} from 'firebase/firestore'
//import { successToast, failToast } from '../Components/Toasts/toasts'
//import emailjs from '@emailjs/browser'
import firebase from 'firebase/compat/app' // Import the main Firebase module
import 'firebase/compat/auth' // Import the Firebase Authentication module
import 'firebase/compat/firestore' // Import the Firestore module
import emailjs from '@emailjs/browser'
import { fireToast } from '../components/Toasts/fireToast'
import {convertToFirebaseTimestamp} from './utils'

const userCollection = collection(db, 'Users')
const recapCollection = collection(db, 'recaptcha')

export const getAllJobs = async (c: any) => {
    try {
        return await getDocs(c)
    } catch (e) {
    }
}



export const getUserData = async (userId: string) => {
    try {
        const q = query(userCollection, where('__name__', '==', userId), limit(1))
        const querySnapshot = await getDocs(q)
    
        if (querySnapshot.empty) {
          throw new Error('User not found')
        }
    
        const userDoc = querySnapshot.docs[0]
        //userDoc.data().jobs.forEach(j => {
          //fixDeprecationIssues(userDoc.data(), j)
        //})
        return { id: userDoc.id, ...userDoc.data() }
      } catch (error) {
        console.error('Error getting user:', error)
        logout()
        throw error
      }
    }

export const getRecaptcha = async () => {
    return await getDocs(recapCollection)
}

// const fixDeprecationIssues = (u, j) => {
// can safely run this fn to clean up data but be careful about logic!
//   if (!j.createdDate && j.applicationDate) {
//     console.log('no created date', j.createdDate, j.applicationDate)
//     updateUserJobEntry(u.id, {...j, createdDate: j.applicationDate})
//   } else if (!j.createdDate && !j.applicationDate) {
//     //console.log("HAS NEITER", j)
//     //updateUserJobEntry(u.id, {...j, createdDate: new Date(), applicationDate: new Date()})
//   } else {
//     //console.log('neither', j)
//   }
// }

export const createUserJobEntry = async (userId: string, jobData: JobEntry) => {
    try {
        const userRef = doc(db, 'Users', userId)
        const jobEntryDates = ['applicationDate', 'offerDate', 'lastCommunication']
        const newJobData = structuredClone(jobData)
        jobEntryDates.forEach((d) => {
          if (typeof newJobData[d] === 'string' && newJobData[d]) {
            newJobData[d] = convertToFirebaseTimestamp(newJobData[d])
          }
        })
        
        await setDoc(userRef, { jobs: arrayUnion({...newJobData, createdDate: new Date()}) }, { merge: true })
        fireToast({type: 'success', content: 'Job added successfully!'})
        return 'Job added successfully!'
    } catch (error) {
      console.error('Error creating job:', error)
      fireToast({type: 'error', content: 'Error creating job!'})
      throw error
    }
}

export const updateUserJobEntry = async (userId: string, jobData: JobEntry) => {
    try {
        const userDocRef = doc(db, 'Users', userId)
        const userDocSnapshot = await getDoc(userDocRef)
        const userData = userDocSnapshot.data()

        const jobEntryDates = ['applicationDate', 'offerDate', 'lastCommunication']
        const newJobData = structuredClone(jobData)
        jobEntryDates.forEach((d) => {
          if (typeof newJobData[d] === 'string' && newJobData[d]) {
            newJobData[d] = convertToFirebaseTimestamp(newJobData[d])
          }
        })

        if (userData) {
            let jobEntries = userData.jobs || []
            // Filter out the item with the given meta_unid
            jobEntries = jobEntries.filter((j: JobEntry) => j.meta_unid !== newJobData.meta_unid)
            // Add the updated item to job history
            jobEntries.push({...newJobData, lastUpdatedDate: new Date()})
            // Update the job field in Firestore
            await updateDoc(userDocRef, { jobs: jobEntries })
            fireToast({type: 'success', content: 'Job updated successfully!'})
            return 'Job updated successfully'
        } else {
            fireToast({type: 'error', content: 'Error updating job!'})
            throw new Error('User not found')
        }
    } catch (error) {
        throw error
    }
}

export const deleteUserJobEntry = async (userId: string, jobId: string) => {
    try {
        const userRef = doc(db, 'Users', userId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
            const userData = userDoc.data()
            const jobs = userData?.jobs || []

            // Filter out the job with the matching jobId
            const updatedJobs = jobs.filter((job: JobEntry) => job.meta_unid !== jobId)

            await setDoc(userRef, { jobs: updatedJobs }, { merge: true })

            fireToast({type: 'success', content: 'Job deleted successfully!'})
            return 'Job deleted successfully!'
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        fireToast({type: 'error', content: 'Error deleting job!'})
        throw error
    }
}


export const createPublicJobEntry = async (jobData: JobEntry) => {
    try {
      // Get the reference to the 'jobs' collection
      const jobsRef = collection(db, 'jobs')
      const jobEntryDates = ['applicationDate', 'offerDate', 'lastCommunication']
      const newJobData = structuredClone(jobData)
      jobEntryDates.forEach((d) => {
        if (typeof newJobData[d] === 'string' && newJobData[d]) {
          newJobData[d] = convertToFirebaseTimestamp(newJobData[d])
        }
      })
      
      // Add a new document with the jobData
      await addDoc(jobsRef, {...newJobData, createdDate: new Date()}) // createdDate keeps track of when the job listing was created
      
      fireToast({ type: 'success', content: 'Job added successfully!' })
      return 'Job added successfully!'
    } catch (error) {
      console.error('Error creating job:', error)
      fireToast({ type: 'error', content: 'Error creating job!' })
      throw error
    }
  }

  export const updatePublicJobEntry = async (jobId: string, updatedJobData?: JobEntry) => {
    try {
      // Get a reference to the specific job document
      const jobDocRef = doc(db, 'jobs', jobId)
  
      if (updatedJobData) {
        // Update or overwrite the document entirely
        const newJobData = structuredClone(updatedJobData)
        const jobEntryDates = ['applicationDate', 'offerDate', 'lastCommunication']
        jobEntryDates.forEach((d) => {
          if (typeof newJobData[d] === 'string' && newJobData[d]) {
            newJobData[d] = convertToFirebaseTimestamp(newJobData[d])
          }
        })
        await setDoc(jobDocRef, {...newJobData, lastUpdatedDate: new Date()}, { merge: true }) // `{ merge: true }` ensures partial updates if needed
        fireToast({ type: 'success', content: 'Job updated successfully!' })
      } else {
        // If no data is provided, throw an error
        throw new Error('No data provided to update the job')
      }
  
      return 'Job updated successfully!'
    } catch (error) {
      console.error('Error updating job:', error)
      fireToast({ type: 'error', content: 'Error updating job!' })
      throw error
    }
  }
  
  export const deletePublicJobEntry = async (metaUnid: string) => {
    try {
      const publicJobsCollection = collection(db, 'jobs')
    
      // Create a query to find the document with the specified meta_unid
      const q = query(publicJobsCollection, where('meta_unid', '==', metaUnid))
      
      // Execute the query
      const querySnapshot = await getDocs(q)
      
      // Check if any documents were found
      if (!querySnapshot.empty) {
        // Iterate through the found documents
        for (const docSnapshot of querySnapshot.docs) {
          // Create a document reference
          const jobDocRef = doc(db, 'jobs', docSnapshot.id)
          
          // Delete the document
          await deleteDoc(jobDocRef)
          fireToast({type: 'success', content: 'Job deleted successfully!'})
        }
      } else {
        fireToast({ type: 'error', content: `No job found with meta_unid: ${metaUnid}`})  
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      fireToast({ type: 'error', content: 'Error deleting job!' })
      throw error
    }
  }
  

// export const getUserJobEntries = async (c) => {
//     return await getDocs(c)
// }

// export const createWatchHistoryItem = async (userId: string, watchHistoryItemData: HistoryItem) => {
//     try {
//         const userRef = doc(db, 'Users', userId)
//         await setDoc(userRef, { watchHistory: arrayUnion(watchHistoryItemData) }, { merge: true })
//         return 'History item added successfully'
//     } catch (error) {
//       console.error('Error creating watchlist item:', error)
//       throw error
//     }
// }

// export const getUserWatchListItems = async (c) => {
//     return await getDocs(c)
// }

// export const deleteWatchItem = async (userId, itemIdToDelete) => {
//     try {
//         // Reference to the user document
//         const userDocRef = doc(db, 'Users', userId)

//         // Get the user document snapshot
//         const userDocSnapshot = await getDoc(userDocRef)

//         if (userDocSnapshot.exists()) {
//             // Extract watchList from the user document
//             const watchList = userDocSnapshot.data().watchList
//             // Filter out the item with the specified id
//             const updatedWatchList = watchList.filter(item => item.meta_unid !== itemIdToDelete)

//             try {
//                 await updateDoc(userDocRef, {watchList: updatedWatchList})
//                 return true
//             } catch (e) {
//                 console.log({e})
//             }
            
//         } else {
//             console.log('User document does not exist')
//         }
//     } catch (error) {
//         console.error('Error deleting item from watchList:', error)
//     }
// }


// export const sendEmail = async (f, e) => {
//     e.preventDefault()
//     let res : {text: string, status: number | undefined} = {text: '', status: undefined}
//     await emailjs.sendForm('service_6ck6c3s', 'template_78zrdz7', f, 'batOHakdQujkyEzUy')
//         .then((result) => {
//             res = result
//         }, (error) => {
//             res = error
//         })
//     return res
// }
  
export const updateUserFields = async (userId, fieldsToUpdate) => {
    try {
        // Reference to the user document
        const userDocRef = doc(db, 'Users', userId)

        // Get the current user document data
        const userDocSnapshot = await getDoc(userDocRef)
        const userData = userDocSnapshot.data()

        // Object to store only the changed fields
        const updatedFields = {}

        // Iterate through fieldsToUpdate
        for (const field in fieldsToUpdate) {
            if (userData[field] !== fieldsToUpdate[field]) {
                // Only update if the field value has changed
                updatedFields[field] = fieldsToUpdate[field]
            }
        }

        // Update the user document with the changed fields
        await updateDoc(userDocRef, updatedFields)

        // Return success message
        return 'User fields updated successfully'
    } catch (error) {
        // Log and throw error
        console.error('Error updating user fields:', error)
        throw error
    }
}

export const sendEmail = async (f, e) => {
    e.preventDefault()
    let res : {text: string, status: number | undefined} = {text: '', status: undefined}
    await emailjs.sendForm('service_1nwafw8', 'template_k1b5coc', f, 'batOHakdQujkyEzUy')
        .then((result) => {
            res = result
        }, (error) => {
            res = error
        })
    return res
}