import Stack from "@mui/material/Stack";
import { formatDate, formatTimeWithoutSeconds } from "../../utils/dateUtils";

const RecentMusicItem = ({ track, index }) => {

    return (
        <Stack className="music-row" direction="row" key={track.played_at}>

            {/* TRACK NUMBER */}
            <div className="flex-center num-container">
                <p>
                    {index+1}
                </p>
            </div>

            {/* TRACK DETAILS */}
            <Stack className="track-details-container" direction="row" spacing={1.5}>

                {/* TRACK IMAGE & HYPERLINK */}
                <div>
                    <a className="spotify-hyperlink" href={track.track.external_urls['spotify']} target="_blank" rel="noreferrer">
                        <img className="album" src={track.track.album.images[2].url} alt="Album"/>
                    </a>
                </div>

                {/* TRACK NAME & ARTIST NAME */}
                <Stack justifyContent="center">
                    <h4>{track.track.name}</h4>
                    <p>{track.track.artists.map(artist => artist.name).join(', ')}</p>
                </Stack>

            </Stack>

            {/* TRACK TIME PLAYED */}
            <Stack className="track-played-container" direction="column" alignItems="center">

                {/* TRACK PLAYED DATE */}
                <p>
                    {formatDate(track.played_at)}
                </p>

                {/* TRACK PLAYED TIME */}
                <p>
                    {formatTimeWithoutSeconds(track.played_at)}
                </p>
                
            </Stack>

        </Stack>
    )
}

export default RecentMusicItem;