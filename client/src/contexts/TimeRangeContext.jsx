import { useState, createContext } from "react";

export const TimeRangeContext = createContext({
    timeRange: "medium_term",
    changeTimeRange: () => {},
})

export function TimeRangeProvider({ children }) {
    const [timeRange, setTimeRange] = useState("medium_term")

    async function changeTimeRange(newTimeRange) {
        console.log('got time range', newTimeRange)
        setTimeRange(newTimeRange)
    }

    const contextValue = {
        timeRange: timeRange,
        changeTimeRange, 
    }

    return (
        <TimeRangeContext.Provider value={contextValue}>
            {children}
        </TimeRangeContext.Provider>
    )
}