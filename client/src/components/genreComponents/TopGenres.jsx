import Divider  from '@mui/material/Divider';

import GenreItem from "../itemComponents/GenreItem";

const TopGenres = ({ topGenres }) => {

    return (
        <div style={{ marginLeft: "1rem", zIndex: "3" }}>

            <h1 style={{ textAlign: "center", paddingTop: "1rem", paddingLeft: "2rem", paddingBottom: "0.5rem", zIndex: "3"  }}>Your Top {topGenres.length} Genres 📕</h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Divider style={{ 
                    display: "flex", justifyContent: "center", backgroundColor: "white", marginBottom: "1rem", 
                    width: "50%", height: "5px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <div>
                    {
                        topGenres.slice(0,5).map((item, index) => GenreItem(item, index))
                    }
                </div>
                <div>
                    {
                        topGenres.slice(5,10).map((item, index) => GenreItem(item, index+5 ))
                    }
                </div>
            </div>

            <div style={{ textAlign: "center" }}>
                <small style={{ textAlign: "center", fontSize: "12px", color: "lightgrey", zIndex: "3" }}>
                    Your top genres are determined by looking at your top 50 artists from the chosen time period and looking at the genres associated with each artist.
                </small>
            </div>

        </div>
    )
}

export default TopGenres;