import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
      Time: "1850-01",
      Anomaly_deg_C: -0.67456436
    },
    {
      Time: "1850-02",
      Anomaly_deg_C: -0.333416
    },
    {
      Time: "1850-03",
      Anomaly_deg_C: -0.59132266
    },
    {
      Time: "1850-04",
      Anomaly_deg_C: -0.58872116
    },
    {
      Time: "1850-05",
      Anomaly_deg_C: -0.5081851
    },
    {
      Time: "1850-06",
      Anomaly_deg_C: -0.34424013
    },
    {
      Time: "1850-07",
      Anomaly_deg_C: -0.15979019
    },
    {
      Time: "1850-08",
      Anomaly_deg_C: -0.2076543
    },
    {
      Time: "1850-09",
      Anomaly_deg_C: -0.3847069
    },
    {
      Time: "1850-10",
      Anomaly_deg_C: -0.53312653
    },
    {
      Time: "1850-11",
      Anomaly_deg_C: -0.2825075
    },
    {
      Time: "1850-12",
      Anomaly_deg_C: -0.40367043
    }]

export default function ClimateLineChart(){



    return(
        <di>
            <LineChart width={800} height={400} data={data}>
                <Line dataKey="Anomaly_deg_C" />
                <XAxis dataKey="Time" />
                <YAxis/>
                <Legend/>
                <Tooltip/>
            </LineChart>

        </di>
    )
} 