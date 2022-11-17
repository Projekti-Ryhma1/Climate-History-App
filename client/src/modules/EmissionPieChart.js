import { useState } from "react";
import { LabelList, Cell, Pie, PieChart, Tooltip } from "recharts";
import "./EmissionPieChart.css";

/** TODO
 *  axios calls to get data from database
 *  show indepth information on sector on click
 *  use spinner when loading etc
 *  make it look nice?
 */

export default function EmissionPieChart() {
  const COLORS = ["#ffff00", "#FF8042", "#996633", "#009900"];
  const [isLoading,setIsLoading] = useState(true)
  const [data3, setdata3] = useState([])

  const renderLabel = (entry) => {
    return entry.Sector;
  };
  const renderPercentage = (data3) => {
    let percentageToString = data3.emissions;
    return percentageToString.toFixed(1).replace(".", ",").toString() + "%";
  };
  const renderPie = (
    <>
      <p>Emission by Sector</p>
      <PieChart width={800} height={500}>
        <Pie
          data={data3}
          dataKey="emissions"
          cx="50%"
          cy="50%"
          label={renderLabel}
          paddingAngle="1"
        >
          {data3.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            fill="#4d4d4d" // Percentage colour
            dataKey={renderPercentage}
            position="inside"
            angle="0"
            stroke="none" // Border of letters
            className="label-percentage"
          />
        </Pie>
      </PieChart>
    </>
  );
  return (
    <div className="container-chart">
      <p>Emission by Sector</p>
      <PieChart width={800} height={500}>
        <Pie
          data={data3}
          dataKey="emissions"
          cx="50%"
          cy="50%"
          label={renderLabel}
          paddingAngle="1"
        >
          {data3.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            fill="#4d4d4d" // Percentage colour
            dataKey={renderPercentage}
            position="inside"
            angle="0"
            stroke="none" // Border of letters
            className="label-percentage"
          />
        </Pie>
      </PieChart>
    </div>
  );
}

const data3 = [
  {
    Sector: "Energy",
    emissions: 73.2,
  },
  {
    Sector: "Industrial processes",
    emissions: 5.2,
  },
  {
    Sector: "Waste",
    emissions: 3.2,
  },
  {
    Sector: "Agriculture, Forestry & Land Use",
    emissions: 18.4,
  },
];
