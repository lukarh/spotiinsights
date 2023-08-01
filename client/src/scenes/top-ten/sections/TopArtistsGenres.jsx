import Stack from '@mui/material/Stack';
import TopGenres from "../../../components/TopArtistsGenresComponents/TopGenres";
import PopularArtists from "../../../components/TopArtistsGenresComponents/PopularArtists";
import UnpopularArtists from "../../../components/TopArtistsGenresComponents/UnpopularArtists";
import { getTopGenres } from "../../../utils/genreUtils";
import { sortArtistsByPopularity } from "../../../utils/ratingsUtils";

const TopArtistGenres = ({ data }) => {

    return (
        <Stack className="padding-2-rem-side">

            {/* USER TOP ARTISTS COMPONENTS */}
            <Stack direction="row" justifyContent="space-evenly" spacing={1}>
                <PopularArtists topArtistsData={data} />
                <UnpopularArtists sortedArtistsData={sortArtistsByPopularity(data)} />
            </Stack>

            {/* USER TOP GENRES COMPONENT */}
            <TopGenres topGenres={getTopGenres(data)}/>
            
        </Stack>
    )
}

export default TopArtistGenres;