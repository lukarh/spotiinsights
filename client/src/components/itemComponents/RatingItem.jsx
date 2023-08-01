import Stack from "@mui/material/Stack";
import Rating from '@mui/material/Rating';

const RatingItem = ({ rating, description, GreyIcon, Icon, index }) => {

    return (
        <Stack direction="row" alignItems="center"spacing={0.25} key={index}>

            {/* RATING DESCRIPTION */}
            <h3>
                {description}
            </h3>

            {/* RATING ICONS */}
            <Rating name="read-only" value={rating} precision={0.1} readOnly max={10} emptyIcon={GreyIcon} icon={Icon} />

            {/* RATING OUT OF 10 */}
            <div className="rating-text-container">
                <h4 className="flex-center rating-text">
                    {rating}/10
                </h4>
            </div>

        </Stack>
    )
}

export default RatingItem;