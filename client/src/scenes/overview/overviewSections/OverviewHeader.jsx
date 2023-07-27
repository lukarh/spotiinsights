import Stack from "@mui/material/Stack";

const OverviewHeader = () => {
    const HEADER_MESSAGE = "Your Vibeify."
    
    return (
        <Stack className="padding-2-rem">
            {/* OVERVIEW HEADER TITLE */}
            <h1 className="text-title text-align-center">{HEADER_MESSAGE}</h1>
        </Stack>
    )
}

export default OverviewHeader;