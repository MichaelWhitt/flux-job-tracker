import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Timestamp } from 'firebase/firestore'

export const formatDate = (d: string | number | Date | Dayjs | null | undefined = dayjs(), short?: boolean, unix?: boolean) => {

    if (d instanceof Timestamp) {
        return dayjs(d.toDate()).format('MM/DD/YYYY')
    }
    if (!d) {
        return 'N / A'
    }
    if (unix) {
        return dayjs(d).unix()
    }
    if (short) {
        return dayjs(d).format('YYYY')
    }

    if (typeof d?.seconds === 'number') {
        return dayjs(d.seconds * 1000).format('MM/DD/YYYY')
    }
    return dayjs(d).format('MM/DD/YYYY')
}

export const renderLocation = (country: string, state: string, city: string, region: string) => {
    if (country && state && city) {
        return `${city}, ${state} (${country})`
    } else if (country && state) {
        return `${state} (${country})`
    } else if (country && region) {
        return `${region} (${country})`
    } else if (region) {
        return region
    } else {
        return ''
    }
}

export const generateColor = (num: string | number, background?: boolean) => {
  const n = Math.round(+num)
  
  let colorClass = ''

  if (n < 1) {
    colorClass = background ? 'bg-[#7faf1f]' : '#7f1d1d' // bg-red-900
  } else if (n === 1) {
      colorClass = background ? 'bg-[#dc2626]' : '#dc2626' // red 600
  } else if (n === 2) {
      colorClass = background ? 'bg-[#ef4444]' : '#ef4444' // red 500
  } else if (n === 3) {
      colorClass = background ? 'bg-[#f87171]' : '#f87171' // red 400
  } else if (n === 4) {
      colorClass = background ? 'bg-[#ca8a04]' : '#ca8a04' // yellow 600
  } else if (n === 5) {
      colorClass = background ? 'bg-[#eab308]' : '#eab308' // yellow 500 
  } else if (n === 6) {
      colorClass = background ? 'bg-[#facc15]' : '#facc15' // yellow 400
  } else if (n === 7) {
      colorClass = background ? 'bg-[#16a34a]' : '#16a34a' // green 600
  } else if (n === 8) {
      colorClass = background ? 'bg-[#22c55e]' : '#22c55e' // green 500
  } else if (n === 9) {
      colorClass = background ? 'bg-[#4ade80]' : '#4ade80' // green 400
  } else {
      colorClass = background ? 'bg-[#86efac]' : '#86efac' // green 300
  }
  return colorClass
}

export const generateUnid = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var unid = ''
    for (var i = 0; i < 16; i++) {
        unid += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return unid
}

export const compressImageToBase64 = async (file) => {
    const maxSize = 500000 // 500000 bytes

        
    const getCompressedSize = async (image: HTMLImageElement, quality: number): Promise<number> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!
            canvas.width = image.width
            canvas.height = image.height
    
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob.size)
                } else {
                    resolve(0)
                }
            }, 'image/jpeg', quality)
        })
    }
    
    return new Promise(async (resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const image = new Image()
            if (e.target?.result) {
                image.src = e.target.result as string
                image.onload = async () => {
                    let quality = 0.8 // initial quality
                    if (file.size > maxSize) {
                        quality = 0.2
                    }
                    let compressedSize = await getCompressedSize(image, quality)
    
                    // Adjust quality and size until compressed size is below maxSize
                    while (quality > 0 && compressedSize > maxSize) {
                        quality -= 0.1
                        compressedSize = await getCompressedSize(image, quality)
                    }
    
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')!
                    canvas.width = image.width
                    canvas.height = image.height
    
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                    canvas.toBlob(
                        (blob) => {
                            const compressedFile = new File([blob!], file.name, {type: 'image/jpeg'})
                            const compressedReader = new FileReader()
                            compressedReader.onload = (compressedEvent) => {
                                if (compressedEvent.target?.result) {
                                    resolve(compressedEvent.target.result as string)
                                }
                            }
                            compressedReader.readAsDataURL(compressedFile)
                        },
                        'image/jpeg',
                        quality
                    )
                }
            }
        }
        reader.readAsDataURL(file)
    })
}


export const isOnMobile = window?.innerWidth < 600

export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const truthy = (x) => {
    return !(x === '0' || x === '' || !x || x === 'false' || x === 'False')
}

// export const formatDate = (d) => {
//     let dateArray = d.split('-')
//     const day = dateArray[2]
//     const month = dateArray[1]
//     const year = dateArray[0]
//     return month + '/' + day + '/' + year
//   }

export const mergeTWClasses = (...classes: String[]) => {
    return classes.filter(Boolean).join(' ')
}

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Text copied to clipboard!')
        })
        .catch(err => {
            console.error('Failed to copy: ', err)
        })
}

export const convertToFirebaseTimestamp = (d: string) => {
    const inputDate = new Date(d)
    const todaysDate = new Date()

    const isToday = inputDate.getFullYear() === todaysDate.getFullYear() &&
    inputDate.getMonth() === todaysDate.getMonth() && // Months are 0-indexed
    inputDate.getDate() === todaysDate.getDate()

    const inputDateTimestamp = Timestamp.fromDate(inputDate)
    const todaysDateTimestamp = Timestamp.fromDate(todaysDate)
    // if today, use date time. if not, use new Date(selectedDate)
    return isToday ? todaysDateTimestamp : inputDateTimestamp
}

export const convertToDateStringFromFBTimestamp = (d: any): string | null => {
    
    // Check if d is a Firebase Timestamp
    if (d instanceof Timestamp) {
        return dayjs(d.toDate()).format('YYYY-MM-DD')
    } else if (d && typeof d === 'object' && 'seconds' in d) {
        return dayjs(d.seconds * 1000).format('YYYY-MM-DD')
    }
    
    // If d is already a string, return it as is
    if (typeof d === 'string') {
        return d
    }
    return d
}

export const getCurrentDateStringForInput = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const renderSalary = (s: string): string => {
    // Convert the salary string to a float
    const salaryNumber = parseFloat(s)
    
    // Format the salary with commas for thousands and ensure two decimal places
    return salaryNumber.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export const sortJobsBy = (m: string, t: string, js: JobEntry[]) => {
        return js.sort((a, b) => {
            if (t === 'asc') {
                switch (m) {
                    case 'Created Date':
                        if (a.createdDate && b.createdDate) {
                            return a.createdDate.seconds - b.createdDate.seconds
                        }
                        break
                    case 'Last Comms':
                        if (a.lastCommunication  && b.lastCommunication ) {
                            return a.lastCommunication.seconds - b.lastCommunication.seconds
                        }
                        break
                    case 'Last Updated':
                        if (a.lastUpdatedDate  && b.lastUpdatedDate ) {
                            return a.lastUpdatedDate.seconds - b.lastUpdatedDate.seconds
                        }
                        break
                    case 'Application Date':
                        if (a.applicationDate  && b.applicationDate ) {
                            return a.applicationDate.seconds - b.applicationDate.seconds
                        }
                        break
                    case 'Offer Date':
                        if (a.offerDate  && b.offerDate ) {
                            return a.offerDate.seconds - b.offerDate.seconds
                        }
                        break
                }
            } else if (t === 'dsc') {
                switch (m) {
                    case 'Created Date':
                        if (a.createdDate  && b.createdDate ) {
                            return b.createdDate.seconds - a.createdDate.seconds
                        }
                        break
                    case 'Last Comms':
                        if (a.lastCommunication  && b.lastCommunication ) {
                            return b.lastCommunication.seconds - a.lastCommunication.seconds
                        }
                        break
                    case 'Last Updated':
                        if (a.lastUpdatedDate  && b.lastUpdatedDate ) {
                            return b.lastUpdatedDate.seconds - a.lastUpdatedDate.seconds
                        }
                        break
                    case 'Application Date':
                        if (a.applicationDate  && b.applicationDate ) {
                            return b.applicationDate.seconds - a.applicationDate.seconds
                        }
                        break
                    case 'Offer Date':
                        if (a.offerDate  && b.offerDate ) {
                            return b.offerDate.seconds - a.offerDate.seconds
                        }
                        break
                }
            }
            return 0 // Return 0 if no conditions matched (to keep original order)
        })
}