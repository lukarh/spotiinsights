import { useState, useEffect } from 'react';

import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import ArtistItem from '../itemComponents/ArtistItem';
import SectionTitle from '../descriptionComponents/SectionTitle';

import { calculateAverageArtistRating } from '../../utils/ratingsUtils';

const UnpopularArtists = ({ sortedArtistsData }) => {
    const [unpopularArtists, setUnpopularArtists] = useState(sortedArtistsData.slice(0, 10))
    const [artistRating, setArtistRating] = useState(calculateAverageArtistRating(sortedArtistsData))

    useEffect(() => {
        const updateArtistComponents = () => {
            setUnpopularArtists(sortedArtistsData.slice(0, 10))
            setArtistRating(calculateAverageArtistRating(unpopularArtists))
        }

        updateArtistComponents()
    }, [sortedArtistsData])

    const UNPOPULAR_ARTIST_TITLE = "Your Top 10 Secret Listens. 🤫"
    const UNPOPULAR_ARTIST_DESC = "Average Popularity Rating: "
    const UNPOPULAR_ARTIST_DESC2 = "Not the most popular artists, but you still managed to give them a listen. 👌"
    const UNPOPULAR_ARTIST_FOOTER = `Your Top 10 Secret Listens are determined by looking who has the lowest popularity rating among your Top 50 Artists.`

    return (
        <Stack className="padding-1-rem">

            {/* UNPOPULAR ARTISTS TITLE */}
            <SectionTitle title={UNPOPULAR_ARTIST_TITLE} />

            {/* UNPOPULAR ARTISTS ITEMS */}
            {
                unpopularArtists.map((item, index) => <ArtistItem item={item} index={index} />)
            }

            {/* UNPOPULAR ARTISTS RATING DESC*/}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <h3>
                    {UNPOPULAR_ARTIST_DESC}
                </h3>
                <Rating name="read-only" value={artistRating} precision={0.1} readOnly max={5} emptyIcon={<StarIcon className="grey-icon" />}/>
            </Stack>

            {/* UNPOPULAR ARTISTS RATING DESC PT.2 */}
            <p className="text-align-center">
                {UNPOPULAR_ARTIST_DESC2}
            </p>

            {/* UNPOPULAR ARTISTS RATING FOOTER */}
            <div>
                <small className="small-desc-lightgrey">
                        {UNPOPULAR_ARTIST_FOOTER}
                </small>
            </div>

        </Stack>
    )
}

export default UnpopularArtists;