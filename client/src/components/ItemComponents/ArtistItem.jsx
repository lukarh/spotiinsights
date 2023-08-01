import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ArtistItem = ({ item, index }) => {
    return (
        <Stack className='artist-row' direction="row" justifyContent="center" alignItems="center" key={index}>

            {/* ARTIST INDEX */}
            <div className="flex-center num-container">
                {index+1}
            </div>

            {/* ARTIST DETAILS CONTAINER */}
            <Stack className="artist-details-container" direction="row" alignItems="center">

                {/* ARTIST IMAGE */}
                <a className="spotify-hyperlink" href={item.external_urls['spotify']} target="_blank" rel="noreferrer" >
                    <img className="artist" src={item.images[2].url} alt="Artist" />
                </a>

                {/* ARTIST NAME */}
                <h3>
                    {item.name}
                </h3>

            </Stack>

            {/* ARTIST RATING */}
            <div className="artist-rating-container">
                <Rating name="read-only" value={parseFloat(item.popularity / 20).toFixed(1)} precision={0.1} readOnly 
                 emptyIcon={<StarIcon className="grey-icon" />}/>
            </div>

            {/* ARTIST HYPERLINK */}
            <a href={item.external_urls['spotify']} target="_blank" rel="noreferrer">
                <ExitToAppIcon className="exit-icon" />
            </a>

        </Stack>
    )
}

export default ArtistItem;