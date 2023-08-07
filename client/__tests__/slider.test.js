import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, cleanup, screen } from "@testing-library/react";
import RecommendSlider from '../src/components/FunctionalComponents/RecommendSlider';

describe(
    'Recommend Slider Component', () => {

        beforeEach(() => {
            jest.clearAllMocks()
        })

        afterEach(() => {
            cleanup()
        })

        test('should render correctly with label above slider', () => {
            const min = 0
            const max = 100
            const step = 1
            const value = [32, 71]
            const ariaLabel = "Test Slider"
            const { getByText } = render(
                <RecommendSlider 
                 ariaLabel={ariaLabel}
                 min={min}
                 max={max}
                 step={step}
                 value={value}
                 valueLabelDisplay="auto"
                 aria-labelledby="range-slider"
                />
            )

            const recommendSlider = screen.getByTestId('recommend-slider')
            const sliderLabel = getByText(ariaLabel)
            expect(recommendSlider).toBeInTheDocument()
            expect(sliderLabel).toBeInTheDocument()
        })

        test('should match snapshot', () => {
            const tree = renderer.create(<RecommendSlider />).toJSON()
            expect(tree).toMatchSnapshot()

        })


})