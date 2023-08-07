import { Box, Slider } from "@mui/material"

const RecommendSlider = ({ ariaLabel, value, min, max, step, handleChange, color }) => {

    return (
        <Box>
            <p>{ariaLabel}</p>
            <Slider
                data-testid="recommend-slider"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                style={{ color: color }}
            />
        </Box>
    )
}

export default RecommendSlider;