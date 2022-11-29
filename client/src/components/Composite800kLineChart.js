import { useEffect, useState } from "react";
import { Legend, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import Spinner from "./Spinner";

export default function Composite800kLineChart(){
    const [isLoading, setIsLoading] = useState(true);
    
    const data = [{year:50, co2ppm: 0.2352, co21sppm: 0.12},
        {year:75, co2ppm: 0.4352, co21sppm: 0.22},
        {year:100, co2ppm: 0.8352, co21sppm: 0.02},
        {year:125, co2ppm: 0.3352, co21sppm: 0.5}];
    
        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, []);
    
    const renderChart = (
        <>
            <p>Hello world chart</p>
            <LineChart
                width={800}
                height={400}>
                    <Line />
                </LineChart>
        </>
    );

    return(
        <div className="container-chart">
            {isLoading ? <Spinner /> : renderChart}
        </div>
    )
}