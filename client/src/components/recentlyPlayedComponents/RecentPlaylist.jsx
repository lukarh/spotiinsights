import { useState } from "react";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import RecentMusicItem from "../itemComponents/RecentMusicItem";
import MusicPagination from "../functionalComponents/MusicPagination";

const RecentPlaylist = ({ recentPlaylist }) => {
    const itemsPerPage = 7

    const [currentPage, setCurrentPage] = useState(1)
    const [visiblePlaylist, setVisiblePlaylist] = useState(recentPlaylist.slice(0, itemsPerPage))

    const HEADER_LABEL = "Most Recently Played. 🎶"

    const handlePageChange = (event, page) => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        
        setCurrentPage(page)
        setVisiblePlaylist(recentPlaylist.slice(startIndex, endIndex))
    }
    
    return (
        <Stack className="recent-container" style={{ width: "50%" }}>
            
            {/* RECENT PLAYLIST TITLE */}
            <h1 className="title-text-divider">
                {HEADER_LABEL}
            </h1>

            <Divider className="default-divider" />

            {/* RECENT PLAYLIST MUSIC ITEMS */}
            <Stack>
                {
                    visiblePlaylist.map((track, index) => <RecentMusicItem track={track} index={index} />)
                }
            </Stack>  

            {/* RECENT PLAYLIST PAGINATION FOR MUSIC ITEMS */}
            <MusicPagination 
             recentPlaylist={recentPlaylist} 
             itemsPerPage={itemsPerPage} 
             currentPage={currentPage} 
             handlePageChange={handlePageChange}
            />

        </Stack>
    )
}

export default RecentPlaylist;