import { formatDate, formatTimeWithoutSeconds } from "../src/utils/dateUtils"

describe('Date Util Functions', () => {

    test('formatDate function should return correct date in the format of m/d/yyyy', () => {
        expect(formatDate('2023-08-05T04:27:23.172Z')).toBe('8/5/2023')
        expect(formatDate('2023-07-31T04:24:27.149Z')).toBe('7/31/2023')

        expect(formatDate('2023-08-05T10:30:00')).toBe('8/5/2023')
        expect(formatDate('08/05/2023')).toBe('8/5/2023')
        expect(formatDate('2023-05-08')).toBe('5/8/2023')
        expect(formatDate('May 8, 2023')).toBe('5/8/2023')
    })

    test('formatDate function should handle incorrect date object strings and booleans/ints/floats', () => {
        expect(formatDate('this is not a date')).toBe('Invalid Date')
        expect(formatDate('2023-07-31T0')).toBe('Invalid Date')
        expect(formatDate(true)).toBe('Invalid Date')
        expect(formatDate(234.34)).toBe('Invalid Date')
        expect(formatDate(1337)).toBe('Invalid Date')
    })

    test('formatTimeWithoutSeconds function should return time in the format of h:mm', () => {
        expect(formatTimeWithoutSeconds('2023-08-06T06:41:19.998Z')).toBe('2:41 AM')
        expect(formatTimeWithoutSeconds('2023-08-05T04:27:23.172Z')).toBe('12:27 AM')
        expect(formatTimeWithoutSeconds('2023-08-05T19:44:27.702Z')).toBe('3:44 PM')
        expect(formatTimeWithoutSeconds('2023-08-03T22:47:45.251Z')).toBe('6:47 PM')
        expect(formatTimeWithoutSeconds('2023-08-01T05:51:03.330Z')).toBe('1:51 AM')
    })

    test('formatTimeWithoutSeconds function should handle incorrect date object strings and booleans/ints/floats', () => {
        expect(formatTimeWithoutSeconds('this is not a date')).toBe('Invalid Date')
        expect(formatTimeWithoutSeconds('2023-07-31T0')).toBe('Invalid Date')
        expect(formatTimeWithoutSeconds(true)).toBe('Invalid Date')
        expect(formatTimeWithoutSeconds(234.34)).toBe('Invalid Date')
        expect(formatTimeWithoutSeconds(1337)).toBe('Invalid Date')
    })

})