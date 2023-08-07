import mockTopArtistsData from "../__testsData__/mockTopArtistsData";
import { capitalizeEveryWord, getTopGenres } from "../src/utils/genreUtils";

describe('Genre Utils Functions', () => {

    test('capitalizeEveryWord function should capitalize every word of the input string', () => {
        expect(capitalizeEveryWord('this is a string')).toBe('This Is A String')
        expect(capitalizeEveryWord('oneword')).toBe('Oneword')
        expect(capitalizeEveryWord('hip-hop')).toBe('Hip-Hop')
        expect(capitalizeEveryWord('a string with some hypenated-words ha-ha')).toBe('A String With Some Hypenated-Words Ha-Ha')
    })

    test('capitalizeEveryWord function should handle non-string inputs', () => {
        expect(capitalizeEveryWord({ property: "value" })).toBe('')
        expect(capitalizeEveryWord(["an array with an element"])).toBe('')
        expect(capitalizeEveryWord(451)).toBe('')
        expect(capitalizeEveryWord(false)).toBe('')
        expect(capitalizeEveryWord(912.2)).toBe('')
    })

    test('getTopGenres function should capitalize the genres provided in the input array of objects and return an array map of genre counts', () => {
        expect(getTopGenres(mockTopArtistsData)).toStrictEqual(
            [["Pop", 14], ["Anime", 5], ["J-Pixie", 4], ["J-Rock", 4], ["J-Pop", 3], ["Anime Lo-Fi", 2], 
            ["Anime Score", 2], ["Modern Rock", 2], ["Canadian Pop", 2], ["Japanese Emo", 2]]
        )
        expect(getTopGenres([])).toStrictEqual([])
    })

    test('getTopGenres function should handle non-array inputs', () => {
        expect(getTopGenres(254)).toStrictEqual([])
        expect(getTopGenres(713.12)).toStrictEqual([])
        expect(getTopGenres(false)).toStrictEqual([])
        expect(getTopGenres({ property: "value" })).toStrictEqual([])
        expect(getTopGenres("i'm not an array")).toStrictEqual([])
    })

})