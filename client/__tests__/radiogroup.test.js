import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { act, render, cleanup, fireEvent } from "@testing-library/react";
import TimeRadioGroup from '../src/components/FunctionalComponents/TimeRadioGroup';

describe('Time Radio Group Component', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    mockHandleTimeChange = jest.fn()

    const currentLabel = 'Current'
    const prev6MonthsLabel = 'Last 6 Months'
    const allTimeLabel = 'All-Time'

    const currentValue = 'short_term'
    const prev6MonthsValue = 'medium_term'
    const allTimeValue = 'long_term'

    test('should render with correct option labels and default label selected', () => {
        const { getByLabelText } = render(<TimeRadioGroup handleTimeChange={mockHandleTimeChange}/>)

        const currentRadioOption = getByLabelText(currentLabel)
        const last6MonthsRadioOption = getByLabelText(prev6MonthsLabel)
        const allTimeRadioOption = getByLabelText(allTimeLabel)

        expect(currentRadioOption).toBeInTheDocument()
        expect(last6MonthsRadioOption).toBeInTheDocument()
        expect(allTimeRadioOption).toBeInTheDocument()

        expect(currentRadioOption.checked).toEqual(false)
        expect(last6MonthsRadioOption.checked).toEqual(true)
        expect(allTimeRadioOption.checked).toEqual(false)
    })

    test('should render options and onClick should change selected radio option', async () => {
        const { getByLabelText } = render(<TimeRadioGroup handleTimeChange={mockHandleTimeChange}/>)

        const currentRadioOption = getByLabelText(currentLabel)
        const last6MonthsRadioOption = getByLabelText(prev6MonthsLabel)
        const allTimeRadioOption = getByLabelText(allTimeLabel)

        await act(async () => {
            fireEvent.click(currentRadioOption)
        })

        fireEvent.click(currentRadioOption, { target: { checked: true } })

        expect(currentRadioOption.checked).toEqual(true)
        expect(last6MonthsRadioOption.checked).toEqual(false)
        expect(allTimeRadioOption.checked).toEqual(false)

        fireEvent.click(allTimeRadioOption, { target: { checked: true } })

        expect(currentRadioOption.checked).toEqual(false)
        expect(last6MonthsRadioOption.checked).toEqual(false)
        expect(allTimeRadioOption.checked).toEqual(true)
    })

    test('should handle callback function on every radio option click', async () => {
        const { getByLabelText } = render(<TimeRadioGroup handleTimeChange={mockHandleTimeChange}/>)

        const currentRadioOption = getByLabelText(currentLabel)
        const last6MonthsRadioOption = getByLabelText(prev6MonthsLabel)
        const allTimeRadioOption = getByLabelText(allTimeLabel)

        await act(async () => {
            fireEvent.click(currentRadioOption)
        })

        expect(mockHandleTimeChange).toHaveBeenCalledTimes(1)
        expect(mockHandleTimeChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({ value: currentValue }),
            }),
            currentValue
        )

        await act(async () => {
            fireEvent.click(allTimeRadioOption)
        })

        expect(mockHandleTimeChange).toHaveBeenCalledTimes(2)
        expect(mockHandleTimeChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({ value: allTimeValue }),
            }),
            allTimeValue
        )

    })

    test('should match snapshot', () => {
        const tree = renderer.create(
            <TimeRadioGroup handleTimeChange={mockHandleTimeChange} />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

})


// {"_reactName": "onChange", 
// "_targetInst": null, 
// "bubbles": true, 
// "cancelable": true, 
// "currentTarget": null, 
// "defaultPrevented": false, 
// "eventPhase": 3, 
// "isDefaultPrevented": [Function functionThatReturnsFalse],
//  "isPropagationStopped": [Function functionThatReturnsFalse], 
//  "isTrusted": false, "nativeEvent": {"isTrusted": false}, 
//  "target": <input class="PrivateSwitchBase-input css-1m9pwf3" name=":r2:" type="radio" value="long_term" />, 
//  "timeStamp": 1691190322276, 
//  "type": "change"}, 
//  "long_term"