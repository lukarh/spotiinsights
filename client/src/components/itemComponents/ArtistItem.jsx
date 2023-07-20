import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ArtistItem = (item, index) => {
    return (
        <div className="row" style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "0.5rem", zIndex: "3" }} key={item.name}>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "5%", paddingLeft: "1.75rem", paddingRight: "1.75rem" }}>
                {index+1}
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "35%" }}>

                <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer" 
                style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: "3" }} >
                    <img src={item.images[2].url} alt="Artist" style={{ borderRadius: "50%", marginRight: "1rem", width: "48px", height: "48px" }} />
                </a>

                <h4 style={{ fontSize: "18px" }}>{item.name}</h4>

            </div>

            <div style={{ width: "22.5%"}}>
                <Rating name="read-only" value={parseFloat(item.popularity / 20).toFixed(1)} precision={0.1} readOnly 
                 emptyIcon={<StarIcon style={{ opacity: 1.0, color: "grey" }} />}/>
            </div>

            <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer" style={{ zIndex: 3 }} >
                <ExitToAppIcon style={{ opacity: 1.0, color: "white" }} />
            </a>

        </div>
    )
}

export default ArtistItem;