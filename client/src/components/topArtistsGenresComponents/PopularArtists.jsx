import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ArtistItem from '../ItemComponents/ArtistItem';
import SectionTitle from '../DescriptionComponents/SectionTitle';
import { calculateAverageArtistRating, getArtistPopularityMessage } from '../../utils/ratingsUtils';

const TOP_ARTIST_TITLE = "Your Top 10 Most Listened Artists. 🎙️"
const TOP_ARTIST_DESC = "Average Popularity Rating: "
const TOP_ARTIST_FOOTER = `What is Popularity Rating? It is a rating with possible values ranging from 0-100 provided by Spotify and converted to a scale of 5 here.`

const PopularArtists = ({ topArtistsData }) => {

    return (
        <Stack className="split-container padding-1-rem">

            {/* TOP ARTIST TITLE */}
            <SectionTitle title={TOP_ARTIST_TITLE} />

            {/* TOP ARTISTS ITEMS */}
            {
                topArtistsData.slice(0, 10).map((item, index) => <ArtistItem item={item} index={index} />)
            }

            {/* TOP ARTISTS RATING DESC */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <h3>
                    {TOP_ARTIST_DESC}
                </h3>
                <Rating name="read-only" value={calculateAverageArtistRating(topArtistsData.slice(0, 10))} precision={0.1} 
                 readOnly max={5} emptyIcon={<StarIcon className="grey-icon" />}/>
            </Stack>

            {/* TOP ARTISTS RATING DESC PT.2 */}
            <p className="text-align-center">
                {getArtistPopularityMessage(calculateAverageArtistRating(topArtistsData.slice(0, 10)))}
            </p>

            {/* TOP ARTISTS RATING FOOTER */}
            <small className="small-desc-lightgrey text-align-center">
                {TOP_ARTIST_FOOTER}
            </small>

        </Stack>
    )
}

export default PopularArtists;
