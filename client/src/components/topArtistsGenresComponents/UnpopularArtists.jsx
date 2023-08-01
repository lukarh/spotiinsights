import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ArtistItem from '../ItemComponents/ArtistItem';
import SectionTitle from '../DescriptionComponents/SectionTitle';
import { calculateAverageArtistRating } from '../../utils/ratingsUtils';

const UNPOPULAR_ARTIST_TITLE = "Your Top 10 Most Unpopular Listens. 🤫"
const UNPOPULAR_ARTIST_DESC = "Average Popularity Rating: "
const UNPOPULAR_ARTIST_DESC2 = "Not the most popular artists, but you still managed to give them a listen. 👌"
const UNPOPULAR_ARTIST_FOOTER = `Your Top 10 Secret Listens are determined by looking who has the lowest popularity rating among your Top 50 Artists.`

const UnpopularArtists = ({ sortedArtistsData }) => {
    return (
        <Stack className="split-container padding-1-rem">

            {/* UNPOPULAR ARTISTS TITLE */}
            <SectionTitle title={UNPOPULAR_ARTIST_TITLE} />

            {/* UNPOPULAR ARTISTS ITEMS */}
            {
                sortedArtistsData.slice(0, 10).map((item, index) => <ArtistItem item={item} index={index} />)
            }

            {/* UNPOPULAR ARTISTS RATING DESC*/}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <h3>
                    {UNPOPULAR_ARTIST_DESC}
                </h3>
                <Rating name="read-only" value={calculateAverageArtistRating(sortedArtistsData.slice(0, 10))} precision={0.1} 
                 readOnly max={5} emptyIcon={<StarIcon className="grey-icon" />}/>
            </Stack>

            {/* UNPOPULAR ARTISTS RATING DESC PT.2 */}
            <p className="text-align-center">
                {UNPOPULAR_ARTIST_DESC2}
            </p>

            {/* UNPOPULAR ARTISTS RATING FOOTER */}
            <small className="small-desc-lightgrey text-align-center">
                    {UNPOPULAR_ARTIST_FOOTER}
            </small>

        </Stack>
    )
}

export default UnpopularArtists;