// Function to format the date portion
export function formatDate(dateString) {
    if (!(dateString instanceof Date) && typeof dateString !== 'string') {
        return 'Invalid Date'
    }

    const dateObj = new Date(dateString)

    if (isNaN(dateObj)) {
        return 'Invalid Date'
    }

    const year = dateObj.getUTCFullYear()
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    return `${month}/${day}/${year}`
}

// Function to format the time portion without seconds
export function formatTimeWithoutSeconds (dateString) { 
    if (!(dateString instanceof Date) && typeof dateString !== 'string') {
        return 'Invalid Date'
    }

    const dateObj = new Date(dateString)

    if (isNaN(dateObj)) {
        return 'Invalid Date'
    }

    const options = { hour: 'numeric', minute: 'numeric' }
    return dateObj.toLocaleTimeString([], options)
}