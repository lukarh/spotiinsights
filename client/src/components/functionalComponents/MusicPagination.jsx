import Pagination from "@mui/material/Pagination";

const MusicPagination = ({ recentPlaylist, itemsPerPage, currentPage, handlePageChange }) => {

    return (
        <div className="flex-center padding-1-rem">
            <Pagination 
                count={Math.ceil(recentPlaylist.length / itemsPerPage)} 
                color="success" 
                showFirstButton 
                showLastButton 
                page={currentPage}
                onChange={handlePageChange}
                sx={{ 
                    button: { color: '#ffffff', fontFamily: "DM Sans" },
                }}
            />
        </div>
    )
}

export default MusicPagination;