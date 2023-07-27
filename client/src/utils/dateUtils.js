// Function to format the date portion
export function formatDate (dateString) {
    const dateObj = new Date(dateString)
    return dateObj.toLocaleDateString()
}

// Function to format the time portion without seconds
export function formatTimeWithoutSeconds (dateString) {
    const dateObj = new Date(dateString)
    const options = { hour: 'numeric', minute: 'numeric' }
    return dateObj.toLocaleTimeString([], options)
}