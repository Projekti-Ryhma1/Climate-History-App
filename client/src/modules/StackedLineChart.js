import { useState, useEffect } from "react";
import {Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import Spinner from "./Spinner";

export default function StackedLineChart() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setData2] = useState([])

  useEffect(() => {
    if (localStorage.getItem("data2") !== null) {
      setData2(JSON.parse(localStorage.getItem("data2")));
    } else {
      const address = "http://localhost:3001/data/co2_emissions_national";
      axios
        .get(address)
        .then((response) => {
          console.log(response.data);
          setData2(response.data);
          localStorage.setItem("data2", JSON.stringify(response.data));
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

  const colours = ["#880808", "#0437F2"];
  let keyArray = [];
  for (let key in data2.at()) {
    keyArray.push(key);
  }
  let newColours = [];
  keyArray.splice(0, 1);
  for (let i = 0; i < keyArray.length; i++) {
    newColours = newColours.concat(colours);
  }
  console.log(newColours);

  let tooltip;
  
  const CustomTooltip = ({active,payload}) =>{
    if(!active || !tooltip) return null
    for (const line of payload){
        if (line.dataKey === tooltip){
            return <div>{line.name}<br/>{line.value}</div>
        }
    }
    return null
  }

  const renderChart = (

    <>
    <p> Co2 Emission by country</p>
    <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        data={data2}
        width={800}
        height={400}
      >
        <Tooltip content={<CustomTooltip/>} />
        <XAxis dataKey="MtCO2/year"></XAxis>
        <YAxis/>
        {keyArray.map((keyId, i) => {
          return (
            <Line
              stroke={newColours.at(i)}
              type="monotone"
              key={keyId}
              dataKey={keyId}
              dot={false}
              name={keyId}
              onMouseOver={()=> tooltip=keyId}
            ></Line>
          );
        })}
      </LineChart>
    
    </>
  )

  return (
    <div>
       {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}

