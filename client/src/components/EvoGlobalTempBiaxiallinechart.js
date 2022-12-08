import "./EvoGlobalTempBiaxiallinechart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Scatter,
  CartesianGrid,
  Label,
  Legend,
  Line,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "./Spinner";

export default function EvoGlobalTempBiaxiallinechart() {
  const [isLoading, setIsLoading] = useState(true);
  const [evoData, setEvoData] = useState([]);
  const [humanActivities, setHumanActivities] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("evoglobaltemp2myr")) {
      setEvoData(JSON.parse(localStorage.getItem("evoglobaltemp2myr")));
    } else {
      const address = "http://localhost:3001/data/evo_of_global_temp_2m_years";

      axios
        .get(address)
        .then((resp) => {
          setEvoData(resp.data);
          localStorage.setItem("evoglobaltemp2myr", JSON.stringify(resp.data));
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (localStorage.getItem("humanActivities") !== null) {
      setHumanActivities(JSON.parse(localStorage.getItem("humanActivities")));
    } else {
      const address = "http://localhost:3001/data/human_evolution_activities";
      axios
        .get(address)
        .then((response) => {
          setHumanActivities(response.data);
          localStorage.setItem(
            "humanActivities",
            JSON.stringify(response.data)
          );
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">Event</p>
          <p className="desc">{payload[0].payload.event}</p>
        </div>
      );
    }
  };
  const tooltipFormatter = ({ value, name }) => {
    if (name === "Human Activities") return <CustomTooltip />;
    return;
  };

  const renderChart = (
    <>
      <p id="headline">
        Evolution of global temperature over the past two million years
      </p>
      <ComposedChart
        id="lineChart"
        width={960}
        height={420}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis
          hide={true}
          data={humanActivities}
          dataKey="years"
          type="number"
          domain={[-2000000, 2022]}
          allowDataOverflow={true}
        ></XAxis>
        <Scatter
          yAxisId={2}
          data={humanActivities}
          name="Human Activities"
          dataKey="loc"
        ></Scatter>

        <XAxis
          xAxisId="evo"
          dataKey="time (kyr BP)"
          /* domain={["auto", "auto"]} */
          reversed="true"
          interval="preserveStartEnd"
          allowDuplicatedCategory={false}
        >
          <Label value={"Time (ka)"} offset={-10} position="insideBottom" />
        </XAxis>
        <CartesianGrid />
        <YAxis yAxisId={1} orientation="left" />
        <YAxis yAxisId={2} orientation="right" domain={["auto", 420]} />
        <Tooltip
          tooltipFormatter={tooltipFormatter}
          content={<CustomTooltip />}
        />
        <Legend verticalAlign="top" />
        <Line
          data={evoData}
          type="monotone"
          dataKey="50 %"
          name="Change in global temperature (°C)"
          stroke="#8884d8"
          dot={false}
          activeDot={false}
          yAxisId={1}
          xAxisId="evo"
        />
        <Line
          data={evoData}
          type="monotone"
          dataKey="carbon dioxide (ppm)"
          name="carbon dioxide (ppm)"
          stroke="#82ca9d"
          dot={false}
          activeDot={false}
          yAxisId={2}
          xAxisId="evo"
        />
      </ComposedChart>
      <div>
        <p id="description">
          Shows the global temperature over the past 2 million years estimated
          from a database of over 20,000 sea surface temperature point
          reconstructions.
        </p>
      </div>
    </>
  );

  return (
    <div className="biaxialline-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
