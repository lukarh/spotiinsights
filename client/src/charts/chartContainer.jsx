import Stack from "@mui/material/Stack";
import SectionTitle from "../components/DescriptionComponents/SectionTitle";

const ChartContainer = ({ Chart, title, footer }) => {

    return (
        <Stack>

            {/* CHART SECTION TITLE */}
            <SectionTitle title={title} />

            {/* DISPLAY CHART COMPONENT */}
            {Chart} 

            {/* CHART FOOTER/DESCRIPTION */}
            <div>
                <small className="small-desc-white">
                    {footer}
                </small>
            </div>

        </Stack>
    )
}

export default ChartContainer;