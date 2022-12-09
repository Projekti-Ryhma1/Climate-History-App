import "./charts.css";
import {LineChart, Line, XAxis, YAxis,Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Spinner from "./Spinner";
import {useEffect, useState} from 'react';

export default function VostokIceLineChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [vostokIce, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("vostokIce") !==null) {
      setData(JSON.parse(localStorage.getItem("vostokIce")));
    } else {
      const address = "http://localhost:3001/data/vostok_ice_data";
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
    }},[]);


    setTimeout(() => {
      setIsLoading(false);
    }, 500);
const renderChart = (
  <>
    <p>Vostok Ice Data</p>
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