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

// V8 CO2 emissions by country

export default function StackedLineChart(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [nationalEmissions, setnationalEmissions] = useState([]);
  const [hideLegend, setHideLegend] = useState(true);

  useEffect(() => {
    setHideLegend(window.innerWidth < props.maxWindowWidth);
    
    if (localStorage.getItem("nationalEmissions") !== null) {
      setnationalEmissions(
        JSON.parse(localStorage.getItem("nationalEmissions"))
      );
    } else {
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/co2_emissions_national";
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
        <p className="headline"> Co2 Emission By Country (V8)</p>
        <p className="description">
        Global fossil CO2 emissions (excluding cement carbonation) in 2021 are returning towards 
        their 2019 levels after decreasing 5.4 % in 2020. Fossil CO2 emissions significantly decreased 
        in 23 countries during the decade 2010–2019. Altogether, these 23 countries contribute to about 
        2.5 GtC yr−1 fossil fuel CO2 emissions over the last decade, only about one-quarter of world 
        CO2 fossil emissions.
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
          <Label value="YEAR" offset={-10} position="insideBottom"/>
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
        {!hideLegend&&<Legend style={{fontSize:"20px"}}/>}
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
