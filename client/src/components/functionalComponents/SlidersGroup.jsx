import { Box } from "@mui/material";
import RecommendSlider from "./RecommendSlider";

const SlidersGroup = ({ sliderValues }) => {
    
    return (
        <Box className="padding-2-rem">
            <h1 className="text-align-center">Song Filters</h1>
            {
                sliderValues.map((item, index) => 
                    <RecommendSlider 
                        ariaLabel={item.ariaLabel} 
                        value={item.value}
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        handleChange={item.handleChange}
                        color={item.color}
                />)
            }
        </Box>
    )
}

export default SlidersGroup;