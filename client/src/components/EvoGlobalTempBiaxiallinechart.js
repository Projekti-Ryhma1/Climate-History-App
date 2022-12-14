import "./charts.css";
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
  ResponsiveContainer,
} from "recharts";
import Spinner from "./Spinner";

// V7 Evolution of global temperature over the past two million years
// V10 Human Evolution and Activities

export default function EvoGlobalTempBiaxiallinechart() {
  const [isLoading, setIsLoading] = useState(true);
  const [evoData, setEvoData] = useState([]);
  const [humanActivities, setHumanActivities] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("evoglobaltemp2myr")) {
      setEvoData(JSON.parse(localStorage.getItem("evoglobaltemp2myr")));
    } else {
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/evo_of_global_temp_2m_years";

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
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/human_evolution_activities";
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
      <p className="headline">Evolution of global temperature over the past two million years (V7, V10)</p>
      <p className="description">

      </p>
      <div>
        <p className="description">
        Reconstructions of Earth’s past climate strongly influence our 
        understanding of the dynamics and sensitivity of the climate 
        system.  Here I present a spatially weighted 
        proxy reconstruction of global temperature over the past 2 million 
        years estimated from a multi-proxy database of over 20,000 sea 
        surface temperature point reconstructions.
        </p>
      </div>
      <ResponsiveContainer width={'100%'} height={420}>
        <ComposedChart
          id="lineChart"
          width={960}
          height={420}
          margin={{ top: 10, right: 0, left: 0, bottom: 15 }}
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
            <Label value={"Time in years"} offset={-10} position="insideBottom" />
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
      </ResponsiveContainer>
    </>
  );

  return (
    <div className="biaxialline-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
