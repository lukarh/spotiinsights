import Stack from '@mui/material/Stack';
import TopTracks from "../../../components/TopUserSongsComponents/TopTracks";
import TracksSpectrum from "../../../components/TopUserSongsComponents/TracksSpectrum";

const TopUserSongs = ({ data }) => {

    const getSpectrumData = (tracks) => {
        const happyTracks = [...tracks].sort((a, b) => b.features.valence - a.features.valence).slice(0,5)
        const sadTracks = [...tracks].sort((a,b) => a.features.valence - b.features.valence).slice(0,5)
        const spectrumTracks = happyTracks.concat(sadTracks.reverse())

        return spectrumTracks
    }

    return (
        <Stack className="padding-2-rem">

            {/* USER'S TOP TRACKS FROM CHOSEN TIME PERIOD */}
            <TopTracks topTracksData={data} /> 

            {/* USER"S HAPPIEST AND SADDEST SONGS FROM CHOSEN PERIOD */}
            <TracksSpectrum spectrumData={getSpectrumData(data)} />
            
        </Stack>
    )
}

export default TopUserSongs;