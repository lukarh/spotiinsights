import { scaleLinear } from 'd3';
import { formatDate, formatTimeWithoutSeconds } from "./dateUtils"

// Function that prepares the data for BPM Bar Chart to ingest
export function createBPMChartData (arr) {
    // check if array exists
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return []
    }

    // create BPM data for Bar Chart
    const minBPM = 70
    const maxBPM = 180
    const bpmColorScale = scaleLinear()
        .domain([minBPM, (minBPM + maxBPM) / 2, maxBPM])
        .range(['cyan','gold','red'])

    // prepare data for nivocharts to ingest
    const bpmData = arr.map((musicItem, index) => (
        {
            track: musicItem.track.name,
            BPM: parseFloat(musicItem.features.tempo).toFixed(1),
            color: bpmColorScale(musicItem.features.tempo),
            date: formatDate(musicItem.played_at),
            time: formatTimeWithoutSeconds(musicItem.played_at),
            dateTime: formatDate(musicItem.played_at) + " " + formatTimeWithoutSeconds(musicItem.played_at)
        }
    ))

    return bpmData
}

// Function that prepares the data for Happiness Line Chart to ingest
export function createHappinessChartData (arr) {
    // check if array exists
    if ((!arr) || arr.length === 0 || !Array.isArray(arr)) {
        return []
    }

    // prepare line data for nivocharts to ingest
    const happinessData = [
        {
            "id": "happiness",
            "data": arr.map((musicItem, index) => (
                    {
                        "x": index+1,
                        "y": parseFloat(musicItem.features.valence - 0.5).toFixed(3),
                        "song": musicItem.track.name,
                        "dateTime": formatDate(musicItem.played_at) + " " + formatTimeWithoutSeconds(musicItem.played_at)
                    }
                ))
        }
    ]

    return happinessData
}