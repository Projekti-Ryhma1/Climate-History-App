import "./charts.css";
import { useEffect, useState } from "react";
import { Legend, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Spinner from "./Spinner";
import axios from "axios";

export default function Composite800kLineChart() {
    const [isLoading, setIsLoading] = useState(true);
    const [compositeData, setCompositeData] = useState([])

        //Load data from localstorage if exists, else load from server
        useEffect(() => {
            if(localStorage.getItem("antarcticcomposite") !== null){
                setCompositeData(JSON.parse(localStorage.getItem("antarcticcomposite")));
            } else {
                const address =   process.env.REACT_APP_API_ADDRESS + "/data/antarctic_composite";
                axios.get(address)
                .then((response) => {
                    setCompositeData(response.data);
                    localStorage.setItem("antarcticcomposite", JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, []);
    
    const renderChart = (
        <>
            <p className="headline">Ice core 800k year composite study CO2 measurement V6</p>
            <p className="description">CO2 concentrations based on Ice core drilling in Antarctica. Time span of ~800,000 years.</p>
            <ResponsiveContainer width={'100%'} height={420}>
            <LineChart
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                data={compositeData}
                width={800}
                height={400}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line 
                        dataKey="co2 ppmv" 
                        name="CO2 ppmv"
                        dot={false}
                    />
                    <YAxis type="number"/>
                    <XAxis 
                        dataKey="year"
                        reversed={true}
                        angle={-55}
                        tickMargin={25}
                        interval={110}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={26}/> {/* Add chart legend to top */}
            </LineChart>
            </ResponsiveContainer>
        </>
    );

    return(
        <div className="container-chart">
            {isLoading ? <Spinner /> : renderChart}
        </div>
    )
}