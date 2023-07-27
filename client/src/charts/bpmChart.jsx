import { ResponsiveBar } from '@nivo/bar'

const BPMChart = ({ data }) => {

    return (
        <div className="chart-wrapper">

            <ResponsiveBar 
                    data={data}
                    keys={[
                        'BPM',
                    ]}
                    borderRadius={5}
                    indexBy="dateTime"
                    padding={0.3}
                    colors={(d) => d.data.color} // Use the customized colors
                    enableLabel={false}
                    enableGridY={false}
                    tooltip={d => {
                        return (
                            <div className="bar-tooltip">
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