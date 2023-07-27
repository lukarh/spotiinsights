import { useState, useEffect } from 'react';

import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import ArtistItem from '../itemComponents/ArtistItem';
import SectionTitle from '../descriptionComponents/SectionTitle';

import { calculateAverageArtistRating, getArtistPopularityMessage } from '../../utils/ratingsUtils';

const PopularArtists = ({ topArtistsData }) => {
    const [popularArtists, setPopularArtists] = useState(topArtistsData.slice(0, 10))
    const [artistRating, setArtistRating] = useState(calculateAverageArtistRating(topArtistsData))
    const [artistRatingMessage, setArtistRatingMessage] = useState(getArtistPopularityMessage(artistRating))

    useEffect(() => {
        const updateArtistComponents = () => {
            setPopularArtists(topArtistsData.slice(0, 10))
            setArtistRating(calculateAverageArtistRating(popularArtists))
            setArtistRatingMessage(getArtistPopularityMessage(artistRating))
        }

        updateArtistComponents()
    }, [topArtistsData])

    const TOP_ARTIST_TITLE = "Your Top 10 Artists. 🎙️"
    const TOP_ARTIST_DESC = "Average Popularity Rating: "
    const TOP_ARTIST_FOOTER = `What is Popularity Rating? It is a rating with possible values ranging from 0-100 provided by Spotify and converted to a scale of 5 here.`

    return (
        <Stack className="padding-1-rem">

            {/* TOP ARTIST TITLE */}
            <SectionTitle title={TOP_ARTIST_TITLE} />

            {/* TOP ARTISTS ITEMS */}
            {
                popularArtists.map((item, index) => <ArtistItem item={item} index={index} />)
            }

            {/* TOP ARTISTS RATING DESC */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <h3>
                    {TOP_ARTIST_DESC}
                </h3>
                <Rating name="read-only" value={artistRating} precision={0.1} readOnly max={5} emptyIcon={<StarIcon className="grey-icon" />}/>
            </Stack>

            {/* TOP ARTISTS RATING DESC PT.2 */}
            <p className="text-align-center">
                {artistRatingMessage}
            </p>

            {/* TOP ARTISTS RATING FOOTER */}
            <div>
                <small className="small-desc-lightgrey">
                    {TOP_ARTIST_FOOTER}
                </small>
            </div>

        </Stack>
    )
}

export default PopularArtists;
