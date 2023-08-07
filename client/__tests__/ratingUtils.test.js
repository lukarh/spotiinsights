import mockTopArtistsData from "../__testsData__/mockTopArtistsData";
import mockRecentPlaylistData from "../__testsData__/mockRecentPlaylistData";
import mockRecentPlaylistDataV2 from "../__testsData__/mockRecentPlaylistDataV2";
import { calculateAverageArtistRating, calculateAverageTempo, calculateAvgPopularityRating, calculateAverageRating } from "../src/utils/ratingsUtils";

describe('Rating Utils Functions', () => {

    test('calculateAverageRating should return average rating given a property and array of tracks', () => {
        expect(calculateAverageRating(mockRecentPlaylistData, 'acousticness')).toBe("1.6")
        expect(calculateAverageRating(mockRecentPlaylistData, 'danceability')).toBe("4.9")
        expect(calculateAverageRating(mockRecentPlaylistData, 'energy')).toBe("7.4")
        expect(calculateAverageRating(mockRecentPlaylistData, 'valence')).toBe("4.3")
        expect(calculateAverageRating(mockRecentPlaylistData, 'instrumentalness')).toBe("1.1")
        expect(calculateAverageRating(mockRecentPlaylistData, 'speechiness')).toBe("0.8")
    })

    test('calculateAverageRating should handle edge cases', () => {
        expect(calculateAverageRating([], 'acousticness')).toBe("N/A")
        expect(calculateAverageRating(true, 'valence')).toBe("N/A")
        expect(calculateAverageRating(3.14159, 'instrumentalness')).toBe("N/A")
        expect(calculateAverageRating("i'm not an array", 'speechiness')).toBe("N/A")
    })

    test('calculatePopularityRating should return average popularity rating given an array of tracks', () => {
        expect(calculateAvgPopularityRating(mockRecentPlaylistData)).toBe('6.2')
        expect(calculateAvgPopularityRating(mockRecentPlaylistDataV2)).toBe('6.3')
    })

    test('calculatePopularityRating should handle edge cases', () => {
        expect(calculateAvgPopularityRating([])).toBe("N/A")
        expect(calculateAvgPopularityRating(true)).toBe("N/A")
        expect(calculateAvgPopularityRating(3.14159)).toBe("N/A")
        expect(calculateAvgPopularityRating("i'm not an array")).toBe("N/A")
    })

    test('calculateAverageTempo should return average BPM rating given an array of objects', () => {
        expect(calculateAverageTempo(mockRecentPlaylistData)).toBe('123.0 BPM')
        expect(calculateAverageTempo(mockRecentPlaylistDataV2)).toBe('121.1 BPM')
    })

    test('calculateAverageTempo should handle edge cases', () => {
        expect(calculateAverageTempo([])).toBe("N/A")
        expect(calculateAverageTempo(true)).toBe("N/A")
        expect(calculateAverageTempo(3.14159)).toBe("N/A")
        expect(calculateAverageTempo("i'm not an array")).toBe("N/A")
    })

    test('calculateAverageArtistRating should return average popularity given an array of artists', () => {
        expect(calculateAverageArtistRating(mockTopArtistsData)).toBe("3.1")
        expect(calculateAverageArtistRating(mockTopArtistsData.slice(15,31))).toBe("3.2")
        expect(calculateAverageArtistRating(mockTopArtistsData.slice(5,12))).toBe("3.5")
    })

    test('calculateAverageArtistRating should handle edge cases', () => {
        expect(calculateAverageArtistRating([])).toBe("N/A")
        expect(calculateAverageArtistRating(true)).toBe("N/A")
        expect(calculateAverageArtistRating(3.14159)).toBe("N/A")
        expect(calculateAverageArtistRating("i'm not an array")).toBe("N/A")
    })

})