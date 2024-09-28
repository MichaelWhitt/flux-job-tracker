import { db, logout } from '../firebase-config'
import {collection, getDocs, updateDoc, doc, getDoc, deleteDoc, setDoc, query, where, limit, arrayUnion} from 'firebase/firestore'
//import { successToast, failToast } from '../Components/Toasts/toasts'
//import emailjs from '@emailjs/browser'
import firebase from 'firebase/compat/app' // Import the main Firebase module
import 'firebase/compat/auth' // Import the Firebase Authentication module
import 'firebase/compat/firestore' // Import the Firestore module
import emailjs from '@emailjs/browser'
import { fireToast } from '../components/Toasts/fireToast'

const userCollection = collection(db, 'Users')
const recapCollection = collection(db, 'recaptcha')

export const getAllJobs = async (c: any) => {
    try {
        return await getDocs(c)
    } catch (e) {
        console.log(e)
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

export const createJobEntry = async (userId: string, jobData: JobEntry) => {
    try {
        const userRef = doc(db, 'Users', userId)
        await setDoc(userRef, { jobs: arrayUnion(jobData) }, { merge: true })
        fireToast({type: 'success', content: 'Job added successfully!'})
        return 'Job added successfully!'
    } catch (error) {
      console.error('Error creating job:', error)
      fireToast({type: 'error', content: 'Error creating job!'})
      throw error
    }
}

export const getUserJobEntries = async (c) => {
    return await getDocs(c)
}

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

// export const updateUserWatchListItem = async (watchListItemData: WatchListItem) => {
//     const watchItemDoc = doc(db, 'blogs', watchListItemData.id)
//     try {
//         return await updateDoc(watchItemDoc, watchListItemData)
//         .then(() => {
//             //successToast(`Successfully Updated Blog - ${blogData.title}`)
//         })
//     } catch (e:any) {
//         //failToast(e)
//     }
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