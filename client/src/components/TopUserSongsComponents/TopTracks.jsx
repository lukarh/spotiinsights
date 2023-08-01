import Stack from "@mui/material/Stack";
import SectionTitle from "../DescriptionComponents/SectionTitle";
import MusicItem from "../ItemComponents/MusicItem";

const TOP_TRACKS_LABEL = "Your Top 10 Songs. 🎹"
const TOP_TRACKS_DESC = "Your Top 10 songs is your most listened to songs for whatever time period you chose."

const TopTracks = ({ topTracksData }) => {

    return (
        <Stack className="padding-1-rem">

            {/* TOP TRACKS TITLE */}
            <SectionTitle title={TOP_TRACKS_LABEL} />

            {/* TOP TRACKS SONG ITEMS */}
            <Stack direction="row">
                {
                    topTracksData.slice(0,10).map((item, index) => <MusicItem item={item} index={index} />)
                }
            </Stack>

            {/* TOP TRACKS DESCRIPTION */}
            <small className="small-desc-white text-align-center">
                {TOP_TRACKS_DESC}
            </small>

        </Stack>
    )
}

export default TopTracks;