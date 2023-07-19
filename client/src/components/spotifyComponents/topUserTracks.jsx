import { useState, useEffect } from "react";

import Divider from '@mui/material/Divider';

import axios from "axios";

const TopUserTracks = ({ timeRange, setTimeRange }) => {
    const [topTracksData, setTopTracksData] = useState(undefined)

    useEffect(() => {

        const fetchUserSpotifyData = async () => {
            try {
                const response = await axios.get(`/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                // const response = await axios.get(`http://localhost:5000/api/spotify/top-tracks?timeRange=${timeRange}`, { withCredentials: true })
                const { tracksData } = response.data

                setTopTracksData(tracksData.items)
            } catch (error) {
                window.location.href = '/home'
            }
        }

        fetchUserSpotifyData()        
        
    }, [timeRange])

    const MusicItem = (item, index) => {
        const removeParanthesesRegex = /\([^()]*\)/g

        return (
            <div className="row" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "0.25rem", width: "10%" }} 
             key={index+1}>
                <a href={item.external_urls.spotify}>
                    <img src={item.album.images[1].url} style={{ borderRadius: "5px", marginBottom: "10px", height: "100px", width: "100px" }} />
                </a>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p>#{index+1}</p>
                    <h5 style={{ fontSize: "14px" }}>{item.name.replace(removeParanthesesRegex, '')}</h5>
                    <p style={{ fontSize: "12px" }}>{item.artists.slice(0,2).map(artist => artist.name).join(', ')}</p>
                </div>
            </div>
        )
    }

    const TopTracks = () => {
        return (
            <div style={{ borderRadius: "15px", backgroundColor: "#121212" }}>
                <h1 style={{ paddingTop: "1rem", paddingLeft: "2rem" }}>Your Top 10 Songs</h1>
                <Divider style={{ backgroundColor: "white", marginLeft: "1rem", marginRight: "1rem", marginBottom: "2rem" }} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {
                        topTracksData.slice(0,10).map((item, index) => MusicItem(item, index))
                    }
                </div>  
            </div>
        )
    }

    return (
        <div style={{ padding: "1rem", width: "100%", borderRadius: "15px", backgroundColor: "#121212", width: "100%" }}>
            {
                (topTracksData)
                ?
                <TopTracks />   
                :
                <></>
            }
        </div>
    )
}

export default TopUserTracks;