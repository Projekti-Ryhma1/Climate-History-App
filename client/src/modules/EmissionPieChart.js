import { useState, useCallback } from "react";
import { LabelList, Cell, Pie, PieChart, Sector } from "recharts";
import "./EmissionPieChart.css";

/** TODO
 *  axios calls to get data from database
 *  show indepth information on sector on click
 *  use spinner when loading etc
 *  make it look nice?
 */

export default function EmissionPieChart() {
  const COLORS = ["#ffff00", "#FF8042", "#996633", "#009900"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data4, setdata4] = useState([]);

  const renderLabel = (entry) => {
    return entry.Sector;
  };
  const renderPercentage = (data3) => {
    let percentageToString = data3.emissions;
    return percentageToString.toFixed(1).replace(".", ",").toString() + "%";
  };
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <>
        <g></g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </>
    );
  };
  const onPieEnter = useCallback(
    (_, index) => {
      console.log(index);
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const renderPie = <></>;
  return (
    <div className="container-chart">
      <p>Emission by Sector</p>
      <PieChart width={800} height={500}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data3}
          dataKey="emissions"
          cx="50%"
          cy="50%"
          label={renderLabel}
          paddingAngle="1"
          onMouseEnter={onPieEnter}
        >
          {data3.map((entry, index) => (
            <Cell key={entry.Sector} fill={COLORS[index % COLORS.length]} />
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
