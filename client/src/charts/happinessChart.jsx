import { ResponsiveLine } from '@nivo/line'

const HAPPY_LABEL = 'Happy Land 😄'
const SAD_LABEL = 'Sad Land 😢'

const HappinessChart = ({ data }) => {

    const customTooltip = ({ slice }) => {
        const point = slice.points[0]; // In a line chart, each slice contains only one point
        return (
          <div className="line-tooltip">
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
        )
    }
    
    return (
        <div className="chart-wrapper">

            {/* TEXT LABEL */}
            <p className="text-align-right">
                {HAPPY_LABEL}
            </p>

            {/* LINE CHART */}
            <ResponsiveLine
                    data={data}
                    colors="white"
                    xScale={{ type: "linear", min: 0, max: data[0].data.length + 1 }}
                    yScale={{ type: "linear", min: -.515, max: .515 }}
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

            {/* TEXT LABEL */}
            <p className="text-align-right">
                {SAD_LABEL}
            </p>

        </div>
    )
}

export default HappinessChart;