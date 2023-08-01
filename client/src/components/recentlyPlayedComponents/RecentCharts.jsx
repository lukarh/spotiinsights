// import { useState } from "react";
import Stack from "@mui/material/Stack";
import BPMChart from "../../charts/bpmChart";
import HappinessChart from "../../charts/happinessChart";
import ChartContainer from "../../charts/chartContainer";
import { createBPMChartData, createHappinessChartData } from "../../utils/chartUtils";

const BPM_TITLE = "Your Recent Songs' BPM Monitor. 📻"
const BPM_FOOTER = "A BPM Monitor of your 50 most recently played songs. BPM (Beats per minute) indicates the tempo and pace of a song or piece of music."

const HAPPINESS_TITLE = "Your Song Mood Swings. 🥴"
const HAPPINESS_FOOTER = "Per Spotify's API, each song is assigned a 'valence' rating from 0.0 to 1.0. Low Valence = Sad, while High Valence = Happy"

const RecentCharts = ({ recentPlaylist }) => {
    const chartBPMData = createBPMChartData(recentPlaylist)
    const lineChartData = createHappinessChartData(recentPlaylist)
    // const [chartBPMData, setChartBPMData] = useState(createBPMChartData(recentPlaylist))
    // const [lineChartData, setLineChartData] = useState(createHappinessChartData(recentPlaylist))

    return (
        <Stack spacing={5}>

            {/* BPM CHART */}
            <ChartContainer Chart={<BPMChart data={chartBPMData} />} title={BPM_TITLE} footer={BPM_FOOTER} />

            {/* HAPPINESS CHART */}
            <ChartContainer Chart={<HappinessChart data={lineChartData} />} title={HAPPINESS_TITLE} footer={HAPPINESS_FOOTER} />

        </Stack>
    )
}

export default RecentCharts;