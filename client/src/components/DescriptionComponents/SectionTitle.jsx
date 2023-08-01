import Divider from "@mui/material/Divider";

const SectionTitle = ({ title }) => {

    return (
        <>
            <h1 className="title-text-divider text-align-center">
                {title}
            </h1>

            <Divider className="default-divider" />
        </>
    )
}

export default SectionTitle;