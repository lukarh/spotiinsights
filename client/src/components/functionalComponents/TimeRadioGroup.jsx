import Radio from '@mui/material/Radio';
import Stack from "@mui/material/Stack";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useContext } from 'react';
import { TimeRangeContext } from '../../contexts/TimeRangeContext';

const TimeRadioGroup = ({ handleTimeChange }) => {
    const timeContext = useContext(TimeRangeContext)

    const RADIO_LABEL = "Vibe Check your past Spotify usage for any of the following periods:"

    return (
        <Stack alignItems="center" justifyContent="center">

            {/* RADIO GROUP HEADER */}
            <div>
                <h1>
                    {RADIO_LABEL}
                </h1>
            </div>

            {/* RADIO GROUP CONTAINER */}
            <div className='padding-1-rem' style={{ fontFamily: "DM Sans" }}>

                {/* RADIO GROUP CONTROLS */}
                <FormControl style={{ fontFamily: "DM Sans" }}>
                    <RadioGroup
                        value={timeContext.timeRange}
                        onChange={handleTimeChange}  
                        style={{ display: "flex", flexDirection: "row", justifyContent: "center", fontFamily: "DM Sans" }}
                    >
                        <FormControlLabel value="short_term" control={<Radio />} label="Current" style={{ fontFamily: "DM Sans" }} />
                        <FormControlLabel value="medium_term" control={<Radio />} label="Last 6 Months" style={{ fontFamily: "DM Sans" }} />
                        <FormControlLabel value="long_term" control={<Radio />} label="All-Time" style={{ fontFamily: "DM Sans" }} />
                    </RadioGroup>
                </FormControl>

            </div>

        </Stack>
    )
}

export default TimeRadioGroup;