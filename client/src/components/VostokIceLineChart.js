import "./charts.css";
import {LineChart, Line, XAxis, YAxis,Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

// V5 Vostok Ice Core CO2 measurements, 417160 - 2342 years

export default function VostokIceLineChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [vostokIce, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("vostokIce") !== null) {
      setData(JSON.parse(localStorage.getItem("vostokIce")));
    } else {
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/vostok_ice_data";
      axios
        .get(address)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          localStorage.setItem("vostokIce", JSON.stringify(response.data));
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);


    setTimeout(() => {
      setIsLoading(false);
    }, 500);
const renderChart = (
  <>
    <p className="headline">Vostok Ice Data (V5)</p>
        <p className="description">
        In January 1998, the collaborative ice-drilling project between Russia, the United States, and France at 
        the Russian Vostok station in East Antarctica yielded the deepest ice core ever recovered, reaching a 
        depth of 3,623 m (Petit et al. 1997, 1999). Ice cores are unique with their entrapped air inclusions 
        enabling direct records of past changes in atmospheric trace-gas composition
        </p>
    <ResponsiveContainer width={'100%'} height={400}>
    <LineChart
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      width={800}
      height={400}
    >
      <Line
        stroke="#483BF6"
        data={vostokIce}
        type="monotone"
        dataKey="c02ratio"
        dot={false}
        name="Vostok Ice Chart"
        />
       
        <XAxis
        dataKey="year"
        type="number"
        domain={[2342,417160]}
        />

        <XAxis dataKey="year" type="number" domain={[2342, 417160]} />
        <YAxis data={vostokIce} type="number" domain={["auto", "auto"]} />

        <Legend />
      </LineChart>
      </ResponsiveContainer>
      </>
      );
      return (
        <div className="container-chart">
          {isLoading ? <Spinner /> : renderChart}
        </div>
      )
      }
