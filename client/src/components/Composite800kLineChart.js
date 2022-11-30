import { useEffect, useState } from "react";
import { Legend, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import Spinner from "./Spinner";

export default function Composite800kLineChart(){
    const [isLoading, setIsLoading] = useState(true);
    
    const data = [{year:50, co2ppm: 0.2352, co21sppm: 0.12},
        {year:-50, co2ppm: 0.4352, co21sppm: 0.25},
        {year:-25, co2ppm: 0.3352, co21sppm: 0.14},
        {year:0, co2ppm: 0.42, co21sppm: 0.22},
        {year:80, co2ppm: 0.635, co21sppm: 0.17},
        {year:6000, co2ppm: 0.252, co21sppm: 0.20},
        {year:30000, co2ppm: 0.1352, co21sppm: 0.24},
        {year:150000, co2ppm: 0.472, co21sppm: 0.32},
        {year:799999, co2ppm: 0.3852, co21sppm: 0.5}];
    
        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, []);
    
    const renderChart = (
        <>
            <p>Hello world chart</p>
            <LineChart
                data={data}
                width={800}
                height={400}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line dataKey="co2ppm" dot={false}/>
                    <Line dataKey="co21sppm" dot={false}/>
                    <XAxis
                    dataKey="year"
                    type="number"
                    domain={[850000, -100]} />
                </LineChart>
        </>
    );

    return(
        <div className="container-chart">
            {isLoading ? <Spinner /> : renderChart}
        </div>
    )
}