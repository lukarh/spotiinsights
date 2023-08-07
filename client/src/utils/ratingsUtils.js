// Function to calculate average rating of a certain property for a list of tracks
export function calculateAverageRating (arr, propertyName) {
    // if array does not exist or contains nothing
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return "N/A"
    }
        
    const totalRating = arr.reduce((sum, track) => sum + track.features[propertyName], 0)
    const averageRating = parseFloat(totalRating / arr.length * 10).toFixed(1)

    return averageRating
}

// Function to calculate average BPM
export function calculateAverageTempo (arr) {
    // if array does not exist or contains nothing
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return "N/A"
    }
    
    const totalBPM = arr.reduce((sum, musicObj) => sum + musicObj.features.tempo, 0)
    const averageBPM = parseFloat(totalBPM / arr.length).toFixed(1)
    
    return `${averageBPM} BPM`
}

// Function to calculate average popularity of a list of tracks
export function calculateAvgPopularityRating (arr) {
    // if array does not exist or contains nothing
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return "N/A"
    }
    
    let totalRating = 0
    
    for (const musicItem of arr) {
        totalRating += musicItem.track.popularity
    }

    const averageRating = parseFloat(totalRating / arr.length / 10).toFixed(1)

    return averageRating
}

// Function to get message based on popularity rating of tracks
export function getPopularityMessage (averageRating) {

    if (averageRating >= 8) {
        return "You've been listening to popular/mainstream music."
    } else if (averageRating >= 6) {
        return "You've been listening to popular and various music."
    } else if (averageRating >= 4) {
        return "You've been listening to a mix of niche music."
    } else if (averageRating >= 2) {
        return "You've been listening to niche and lesser-known music."
    } else {
        return "You've been listening to unique and eclectic music."
    }

}

// Function to get average artist rating in given array
export function calculateAverageArtistRating (arr) {
    // edge case if array is undefined or has no elements in it
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return "N/A"
    }

    // calculate average popularity rating
    let totalRating = 0
    for (const artistItem of arr) {
        totalRating += artistItem.popularity
    }
    const averageRating = parseFloat(totalRating / arr.length / 10 / 2).toFixed(1)

    return averageRating
}

// Function to get message based on popularity rating of artists
export function getArtistPopularityMessage (averageRating) {
    
    if (averageRating >= 4) {
        return "You've been listening to popular/mainstream artists."
    } else if (averageRating >= 3) {
        return "You've been listening to popular and various artists."
    } else if (averageRating >= 2) {
        return "You've been listening to a mix of niche artists."
    } else if (averageRating >= 1) {
        return "You've been listening to niche and lesser-known artists."
    } else {
        return "You've been listening to unique and eclectic artists."
    }
}

// Function that sorts an array of artists by ascending popularity
export function sortArtistsByPopularity (arr) {
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return []
    }

    const sortedArray = [...arr].sort((a,b) => a.popularity - b.popularity)
    return sortedArray
}