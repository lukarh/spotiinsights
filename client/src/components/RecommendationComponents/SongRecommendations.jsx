import { useState } from 'react';

import { Stack, Grid, CircularProgress } from '@mui/material';

import SectionTitle from '../DescriptionComponents/SectionTitle';

import RecommendedMusicItem from "../ItemComponents/RecommendedMusicItem";
import MusicPagination from "../FunctionalComponents/MusicPagination";

const itemsPerPage = 3
const RECOMMENDATIONS_TITLE = "Song Recommendations 🎶"

const SongRecommendations = ({ songRecommendations, isLoading }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [visibleRecommendations, setVisibleRecommendations] = useState(songRecommendations.slice(0, itemsPerPage))

    const handlePageChange = (event, page) => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        
        setCurrentPage(page)
        setVisibleRecommendations(songRecommendations.slice(startIndex, endIndex))
    }

    return (
        <div>
            <SectionTitle title={RECOMMENDATIONS_TITLE} />
            {
                (isLoading)
                ?
                <div className="flex-center">
                    <CircularProgress className="spinner-load" />
                </div>
                :
                (songRecommendations === [])
                ?
                <div>
                    <h1>No song recommendations.</h1>
                </div>
                :
                <Stack direction="row">
                    <Grid container>
                        <Grid item xs={4}>
                        {
                            songRecommendations.slice(0, itemsPerPage).map((track, index) =>  <RecommendedMusicItem track={track} index={index} />)
                        }
                        </Grid>
                        <Grid item xs={4}>
                        {
                            songRecommendations.slice(itemsPerPage, 6).map((track, index) =>  <RecommendedMusicItem track={track} index={index} />)
                        }
                        </Grid>
                        <Grid item xs={4}>
                        {
                            songRecommendations.slice(6, 9).map((track, index) =>  <RecommendedMusicItem track={track} index={index} />)
                        }
                        </Grid>
                    </Grid>
                </Stack>
                
            }
            <MusicPagination 
             recentPlaylist={visibleRecommendations} 
             itemsPerPage={itemsPerPage} 
             currentPage={currentPage} 
             handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default SongRecommendations;