import { Stack, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, handleSubmit, errorSearchMessage }) => {

    return (
        <Stack>
            <form onSubmit={handleSubmit} style={{ flex: "1" }}>
                <TextField
                    id="search-bar"
                    className="text"
                    onInput={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search for artist or song..."
                    size="large"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <small>{errorSearchMessage}</small>
            </form>
        </Stack>
    )
}

export default SearchBar;