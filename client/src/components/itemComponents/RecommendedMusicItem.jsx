import Stack from "@mui/material/Stack";

const RecommendedMusicItem = ({ track, index }) => {

    return (
        <Stack className="music-row" direction="row">

            {/* TRACK DETAILS */}
            <Stack className="track-details-container" direction="row" spacing={1.5}>

                {/* TRACK IMAGE & HYPERLINK */}
                <div>
                    <a className="spotify-hyperlink" href={track.external_urls['spotify']} target="_blank" rel="noreferrer">
                        <img className="album" src={track.album.images[2].url} alt="Album"/>
                    </a>
                </div>

                {/* TRACK NAME & ARTIST NAME */}
                <Stack justifyContent="center">
                    <h4>{track.name.split('(')[0]}</h4>
                    <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                </Stack>

            </Stack>

        </Stack>
    )
}

export default RecommendedMusicItem;