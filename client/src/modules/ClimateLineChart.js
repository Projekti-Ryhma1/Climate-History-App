import {
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import "./ClimateLineChart.css";

export default function ClimateLineChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [hideLine, setHideLine] = useState(true);
  const [xAxisMin, setXAxisMin] = useState(1850);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const address = "http://localhost:3001/data/global_monthly";
    axios
      .get(address)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
    const address1 = "http://localhost:3001/data/northern_hemisphere_2000_year";
    axios
      .get(address1)
      .then((response) => {
        console.log(response.data);
        setData1(response.data);
        setTimeout(() => {
          //give 0.5s time for data to load
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function handleClick() {
    if (hideLine) {
      setHideLine(false); //if line is hidden show line..
      setXAxisMin(0);
    } else {
      setHideLine(true); //if line is shown hide line..
      setXAxisMin(1850);
    }
  }

  /**
   * Showind data on both lines works but X axis doesnt scale properly needs fixing
   */

  const renderChart = (
    <>
      <p>Global Temperature Anomaly</p>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        width={800}
        height={400}
      >
        <Line
          stroke="#483BF6"
          xAxisId={"global"}
          data={data}
          type="monotone"
          dataKey="global_anomaly"
          dot={false}
          name="Global temperature anomaly"
        />
        <Line
          hide={hideLine}
          xAxisId={"northern"}
          stroke="#000000"
          data={data1}
          type="monotone"
          dataKey="T"
          dot={false}
          name="Northern hemisphere temperature"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Time"
          xAxisId={"global"}
          type="number"
          domain={[xAxisMin, 2022]}
        />
        <XAxis
         hide={true}
          dataKey="Year"
          xAxisId={"northern"}
          type="number"
          domain={[0, 2022]}
        />
        <YAxis data={data} type="number" domain={["auto", "auto"]} />
        <Legend   />
      </LineChart>
      <button onClick={handleClick}>
        Toggle Northern Temperature 2000 Years
      </button>
    </>
  );

  //if data is still loading show spinner
  return (
    <div className="container-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>

    //dot=False on Line component speedsup page load by 2s~
  );
}
