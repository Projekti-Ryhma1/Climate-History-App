import "./EvoGlobalTempBiaxiallinechart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Spinner from "./Spinner";

export default function EvoGlobalTempBiaxiallinechart() {
    const [isLoading, setIsLoading] = useState(true);
    const [evoData, setEvoData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("evoglobaltemp2myr")) {
            setEvoData(JSON.parse(localStorage.getItem("evoglobaltemp2myr")));

        } else {
            const address = "http://localhost:3001/data/evo_of_global_temp_2m_years";

            axios.get(address)
                .then(resp => {
                    setEvoData(resp.data);
                    localStorage.setItem("evoglobaltemp2myr", JSON.stringify(resp.data));
                })
                .catch(error => {
                    alert(error);
                })
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    const renderChart = (<>
        <p id="headline">Evolution of global temperature over the past two million years</p>
        <LineChart id="lineChart" width={960} height={420} data={evoData}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <XAxis dataKey="time (kyr BP)" domain={["auto", "auto"]} reversed="true" interval="preserveStartEnd">
                <Label value={"Time (ka)"} offset={-10} position="insideBottom"/>
            </XAxis>
            <CartesianGrid/>
            <YAxis yAxisId={1} orientation="right" />
            <YAxis yAxisId={2} orientation="left"/>
            <Tooltip />
            <Legend verticalAlign="top"/>
            <Line type="monotone" dataKey="50 %" name="Change in global temperature (°C)" stroke="#8884d8" dot={false} yAxisId={1}/>
            <Line type="monotone" dataKey="carbon dioxide (ppm)" name="carbon dioxide (ppm)" stroke="#82ca9d" dot={false}yAxisId={2}/>
        </LineChart>
        <div>
            <p id="description">
            Shows the global temperature over the past 2 million years estimated from a database of over 20,000 sea
            surface temperature point reconstructions.
            </p>
        </div>
    </>);

    return (
        <div className="biaxialline-chart">
            { isLoading ? <Spinner /> : renderChart }
        </div>
    );
}