import Rating from '@mui/material/Rating';
import Divider  from '@mui/material/Divider';

import StarIcon from '@mui/icons-material/Star';

import ArtistItem from '../itemComponents/ArtistItem';

const TopArtists = ({ topArtistsData, artistRating, artistRatingMessage }) => {

    return (
        <div style={{ width: "50%", paddingLeft: "1rem", paddingRight: "1rem" }}>

            <h1 style={{ paddingLeft: "2rem", paddingBottom: "0.5rem", zIndex: "3" }}>Your Top 10 Artists. 🎙️</h1>
            <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px", width: "70%" }} />

            <div >
                {
                    topArtistsData.slice(0,10).map((item, index) => ArtistItem(item, index))
                }
            </div>

            <div style={{ padding: "1rem" }}>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
                    <h3 style={{ marginRight: "5px", zIndex: "3" }}>Your Favorite Artists' Popularity Rating:</h3>
                    <Rating name="read-only" value={artistRating} precision={0.1} readOnly max={5} emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />}/>
                </div>

                <p>{artistRatingMessage}</p>

                <small style={{ fontSize: "12px", color: "lightgrey" }}>
                    What is Popularity Rating? It is a metric calculated by Spotify's Alogirthm with the possible range of values
                    being from 0 to 100, with 100 being the most popular. Your popularity rating is an average of all your most played artists
                    and is converted to a scale of 5. 
                </small>

            </div>

        </div>
    )
}

export default TopArtists;
