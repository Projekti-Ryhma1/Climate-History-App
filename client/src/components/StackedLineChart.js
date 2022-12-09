import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";
import Spinner from "./Spinner";
import "./ClimateLineChart.css";

/** TODO
 *  Modify tooltiplabel to look nicer
 *  sort tooltip lag/bug
 *  zoom?
 */

export default function StackedLineChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [nationalEmissions, setnationalEmissions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("nationalEmissions") !== null) {
      setnationalEmissions(
        JSON.parse(localStorage.getItem("nationalEmissions"))
      );
    } else {
      const address = "http://localhost:3001/data/co2_emissions_national";
      axios
        .get(address)
        .then((response) => {
          setnationalEmissions(response.data);
          localStorage.setItem(
            "nationalEmissions",
            JSON.stringify(response.data)
          );
        })
        .catch((error) => {
          alert(error);
        });
    }
    setTimeout(() => {
      //give 0.5s time for data to load
      setIsLoading(false);
    }, 500);
  }, []);

  const colours = [
    "#FF0100",
    "#00FEFF",
    "#F8FF00",
    "#0700FF",
    "#71FF00",
    "#8E00FF",
    "#00FF11",
    "#FF00EE",
  ];
  let keyArray = [];
  for (let key in nationalEmissions.at()) {
    keyArray.push(key); //get keys for nationalEmissions and create new array with keys
  }
  let newColours = [];
  keyArray.splice(0, 1); // remoce "MtCO2/year" from the array
  for (let i = 0; i < keyArray.length; i++) {
    newColours = newColours.concat(colours);
  }

  let tooltip;
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    for (const line of payload) {
      if (line.dataKey === tooltip) {
        return (
          <div>
            <p>{line.name}</p>
            <p>{line.value}</p>
          </div>
        );
      }
    }
    return null;
  };

  const renderChart = (
    <>
      <p> Co2 Emission by country</p>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        data={nationalEmissions}
        width={800}
        height={1200}
      >
        {/* <Legend verticalAlign="bottom" /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <XAxis dataKey="MtCO2/year" interval="preserveEnd"></XAxis>
        <YAxis />
        {keyArray.map((keyId, i) => {
          return (
            <Line
              stroke={newColours.at(i)}
              type="monotone"
              key={keyId}
              dataKey={keyId}
              dot={false}
              name={keyId}
              onMouseOver={() => (tooltip = keyId)}
              activeDot={false}
            ></Line>
          );
        })}
        <Legend></Legend>
      </LineChart>
    </>
  );

  return (
    <div className="container-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
