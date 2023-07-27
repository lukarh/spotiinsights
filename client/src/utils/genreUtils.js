// Function that capitalizes every word given a string
export function capitalizeEveryWord (str) {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Function that returns an array of the user's top 10 genres
export function getTopGenres (arr) {
    const genreCounts = {}

    // get genre counts
    arr.forEach(artistItem => {
        const artistGenres = artistItem.genres

        artistGenres.forEach(genre => {
            if (!genreCounts[capitalizeEveryWord(genre)]) {
                genreCounts[capitalizeEveryWord(genre)] = 1
            } else {
                genreCounts[capitalizeEveryWord(genre)] += 1
            }
        })
    })

    // convert object of genre objects to array of genre arrays in ascending order
    const genreCountsArray = Object.entries(genreCounts);
    genreCountsArray.sort((a, b) => b[1] - a[1]);

    // get top 10 or less genres
    const topGenres = genreCountsArray.slice(0, 10);
    return topGenres
}