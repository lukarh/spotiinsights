import Stack from "@mui/material/Stack";

const CONTACT_TITLE = "Contact"
const CONTACT_DESC = 'Developer: Lukar | GitHub: '
const GITHUB_NAME = 'lukarh'
const EMAIL_DESC = ' | Email: '
const GITHUB_HYPERLINK = "https://github.com/lukarh/vibeify"
const EMAIL_HYPERLINK = "lwhuang@alumni.cmu.edu"

const Contact = () => {

    return (
        <Stack spacing={1}>
            {/* ABOUT HEADER TITLE */}
            <h1 className="text-align-center">
                {CONTACT_TITLE}
            </h1>

            {/* ABOUT DESCRIPTION */}
            <p className="text-align-center">
                {CONTACT_DESC}
                <a className="hyperlink" href={GITHUB_HYPERLINK}>
                    {GITHUB_NAME}
                </a>
                {EMAIL_DESC}
                <a className="hyperlink" href={`mailto:${EMAIL_HYPERLINK}`}>
                    {EMAIL_HYPERLINK}
                </a>
            </p>

        </Stack>
    )
}

export default Contact;