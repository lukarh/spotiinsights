import { Button } from "@mui/material";

const RECOMMEND_BUTTON_LABEL = "Get Song Recommendations"

const RecommendButton = ({ handleSubmit, errorMessage }) => {

    return (
        <div className="flex-column text-align-center padding-2-rem">
            <Button className="recommend-btn" variant="contained" onClick={handleSubmit}>
                {RECOMMEND_BUTTON_LABEL}
            </Button>
            <small className="error-text padding-1-rem">
                {errorMessage}
            </small>
        </div>
    )
}

export default RecommendButton;