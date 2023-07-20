import Divider  from '@mui/material/Divider';

import ArtistItemAlt from '../itemComponents/ArtistItemAlt';

const UnpopularArtists = ({ unpopularArtists }) => {

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "45%", justifyContent: "center", marginLeft: "auto", paddingRight: "1rem" }}>

            <h1 style={{ paddingRight: "2rem", paddingBottom: "0.5rem", marginLeft: "auto" }}>Your Top 5 Secret Listens. 🤫</h1>
            <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem", height: "5px" }} />

            <div>
                {
                    unpopularArtists.map((item, index) => ArtistItemAlt(item, index))
                }
            </div>

            <p style={{ marginLeft: "auto", marginBottom: "5px", paddingRight: "1.25rem", zIndex: "3" }}>
                Not the most popular artists, but you still managed to give them a listen. 👌
            </p>

            <small style={{ fontSize: "12px", color: "lightgrey", marginLeft: "auto", paddingRight: "1.25rem", textAlign: "right", zIndex: "3" }}>
                    Your Top 5 Secret Listens are determined by looking at your Top 50 Artists in a given time period and then 
                    finding the five artists with the lowest popularity rating amongst the group.
            </small>

        </div>
    )
}

export default UnpopularArtists;