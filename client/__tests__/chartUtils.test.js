import { createBPMChartData, createHappinessChartData } from "../src/utils/chartUtils"

jest.mock('d3')

describe('Chart Utils Function', () => {

    test('createBPMChartData function should handle edge cases (non-array inputs)', () => {
        expect(createBPMChartData(254)).toStrictEqual([])
        expect(createBPMChartData(713.12)).toStrictEqual([])
        expect(createBPMChartData(false)).toStrictEqual([])
        expect(createBPMChartData({ property: "value" })).toStrictEqual([])
        expect(createBPMChartData("i'm not an array")).toStrictEqual([])
    })

    test('createHappinessChartData function should handle edge cases (non-array inputs)', () => {
        expect(createHappinessChartData(254)).toStrictEqual([])
        expect(createHappinessChartData(713.12)).toStrictEqual([])
        expect(createHappinessChartData(false)).toStrictEqual([])
        expect(createHappinessChartData({ property: "value" })).toStrictEqual([])
        expect(createHappinessChartData("i'm not an array")).toStrictEqual([])
    })

})