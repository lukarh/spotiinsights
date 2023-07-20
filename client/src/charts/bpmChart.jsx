import { ResponsiveBar } from '@nivo/bar'

const BPMChart = ({ data }) => {

    return (
        <div style={{ height: "500px", position: "relative", width: "100%", display: "block", zIndex: "3", paddingTop: "1rem", paddingBottom: "1rem" }}>
            <ResponsiveBar 
                    data={data}
                    keys={[
                        'BPM',
                        // 'time',
                    ]}
                    borderRadius={5}
                    indexBy="dateTime"
                    padding={0.3}
                    colors={(d) => d.data.color} // Use the customized colors
                    enableLabel={false}
                    enableGridY={false}
                    tooltip={d => {
                        return (
                            <div style={{ 
                                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                                backgroundColor: "black", color: "white", padding: "6px"
                            }}>
                                <p>{d.data.track}</p>
                                <p>BPM: {d.data.BPM}</p>
                                <p>{d.data.date} - {d.data.time}</p>
                            </div>
                        )
                    }}
                />
        </div>
    )
}

export default BPMChart;