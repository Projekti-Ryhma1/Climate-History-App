import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ClimateLineChart() {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
      const address = "http://localhost:3001/data/global_monthly"
        
      axios.get(address).then((response)=>{
        console.log(response.data)
        setData(response.data)
      }).catch(error => {
        alert(error)
      })     
    }, [])
    

  return (
    <div>
      <h2>Global Temperature Anomaly</h2>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        data={data}
        width={800}
        height={400}
      >
        <Line
          type="monotone"
          dataKey="Anomaly (deg C)"
          dot={false}
          name="Global temp anomaly"
        />
        <XAxis dataKey="Time" />
        <YAxis />
        <Legend />
        <Tooltip />
      </LineChart>
    </div>

    //dot=False on Line component speedsup page load by 2s~
  );
}
