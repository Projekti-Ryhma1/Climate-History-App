import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Spinner from "./Spinner";
import "./charts.css";

/** TODO
 *  Modify tooltiplabel to look nicer
 *  sort tooltip lag/bug
 *  zoom?
 */

const maxWindowWidth = 700; // Max size when Legend is not visible

export default function StackedLineChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [nationalEmissions, setnationalEmissions] = useState([]);
  const [hideLegend, setHideLegend] = useState(window.innerWidth < maxWindowWidth);

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

    window.addEventListener('resize', function () {
      const windowSize = window.innerWidth;
      setHideLegend(windowSize < maxWindowWidth);
    });


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
          <div className="custom-tooltip">
            <p className="label">{line.name}</p>
            <p className="desc">{line.value}</p>
          </div>
        );
      }
    }
    return null;
  };
  const tooltipFormatter = ({ value, name }) => {
    if (name === tooltip) return <CustomTooltip />;
    return;
  };

  function checkHeight() {
    if(!hideLegend) {
      return 1200;
    } else {
      return 400;
    }
  }

  const renderChart = (
    <>
      <div>
        <p className="headline"> Co2 Emission By Country</p>
        <p className="description">
          Shows the CO2 emissions of each country over time. Y-Axis is by
          million tonnes of CO2. X-Axis is years.
        </p>
      </div>
      <ResponsiveContainer width={'100%'} height={checkHeight()}>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        data={nationalEmissions}
        width={800}
        height={1200}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          tooltipFormatter={tooltipFormatter}
          content={<CustomTooltip />}
        />
        <XAxis dataKey="MtCO2/year" interval="preserveEnd">
          <Label value="YEAR" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: "MtCO2", angle: -90, position: "insideLeft" }} />
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
        {!hideLegend&&<Legend/>}
      </LineChart>
      </ResponsiveContainer>
    </>
  );

  return (
    <div className="container-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
