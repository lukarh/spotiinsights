import { ResponsiveLine } from '@nivo/line'

const HappinessChart = ({ data, recentPlaylist }) => {

    const customTooltip = ({ slice }) => {
        const point = slice.points[0]; // In a line chart, each slice contains only one point
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
                    background: 'black', padding: '10px', borderRadius: '5px' }}>
            <p>{`${point.data.song}`}</p>
            <p>{`${point.data.dateTime}`}</p>
            {
                (point.data.yFormatted >= 0.1) 
                ? 
                <p>😀</p>
                :
                (point.data.yFormatted >= -0.1) 
                ?
                <p>😐</p>
                :
                <p>😔</p>
            }
          </div>
        );
      };
    

    return (
        <div style={{ height: "600px", position: "relative", width: "100%", display: "block", zIndex: "3", paddingBottom: "4rem" }}>
            Happy Land
            <ResponsiveLine
                    data={data}
                    colors="white"
                    xScale={{ type: "linear", min: 0, max: data[0].data.length + 1 }}
                    yScale={{ type: "linear", min: -.501, max: .501 }}
                    curve="monotoneX"
                    enableGridX={false}
                    pointSize={12}
                    pointLabel="y"
                    lineWidth={4}
                    enableArea
                    enableSlices="x"
                    fill={[
                        {
                        id: 'gradientA',
                        match: '*'
                        }
                    ]}
                    sliceTooltip={customTooltip}                    
                />
            Sad Land
        </div>
    )
}

export default HappinessChart;