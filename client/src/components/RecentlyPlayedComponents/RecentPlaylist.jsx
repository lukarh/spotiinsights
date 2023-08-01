import { useState } from "react";
import Stack from "@mui/material/Stack";
import SectionTitle from "../DescriptionComponents/SectionTitle";
import RecentMusicItem from "../ItemComponents/RecentMusicItem";
import MusicPagination from "../FunctionalComponents/MusicPagination";

const itemsPerPage = 7
const HEADER_LABEL = "Most Recently Played. 🎶"

const RecentPlaylist = ({ recentPlaylist }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [visiblePlaylist, setVisiblePlaylist] = useState(recentPlaylist.slice(0, itemsPerPage))

    const handlePageChange = (event, page) => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        
        setCurrentPage(page)
        setVisiblePlaylist(recentPlaylist.slice(startIndex, endIndex))
    }
    
    return (
        <Stack>
            
            {/* RECENT PLAYLIST TITLE */}
            <SectionTitle title={HEADER_LABEL} />

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