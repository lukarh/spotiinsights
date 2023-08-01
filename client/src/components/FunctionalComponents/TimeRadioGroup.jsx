import Radio from '@mui/material/Radio';
import Stack from "@mui/material/Stack";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useContext } from 'react';
import { TimeRangeContext } from '../../contexts/TimeRangeContext';

const RADIO_LABEL = "Find out your Top 10s for any of the following time periods:"

const TimeRadioGroup = ({ handleTimeChange }) => {
    const timeContext = useContext(TimeRangeContext)

    return (
        <Stack className="padding-1-rem" alignItems="center" justifyContent="center">

            {/* RADIO GROUP HEADER */}
            <div>
                <h1>
                    {RADIO_LABEL}
                </h1>
            </div>

            {/* RADIO GROUP CONTAINER */}
            <div className='radio-group-container padding-1-rem'>

                {/* RADIO GROUP CONTROLS */}
                <FormControl style={{ fontFamily: "DM Sans" }}>
                    <RadioGroup
                        value={timeContext.timeRange}
                        onChange={handleTimeChange}  
                        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontFamily: "DM Sans" }}
                    >
                        <FormControlLabel value="short_term" control={<Radio color="primary" />} label="Current" style={{ fontFamily: "DM Sans" }} />
                        <FormControlLabel value="medium_term" control={<Radio />} label="Last 6 Months" style={{ fontFamily: "DM Sans" }} />
                        <FormControlLabel value="long_term" control={<Radio />} label="All-Time" style={{ fontFamily: "DM Sans" }} />
                    </RadioGroup>
                </FormControl>

            </div>

        </Stack>
    )
}

export default TimeRadioGroup;