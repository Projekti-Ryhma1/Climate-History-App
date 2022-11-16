import { Cell, Pie, PieChart, Tooltip } from "recharts";
import "./EmissionPieChart.css"

export default function EmissionPieChart() {
  const COLORS = ["#ffff00", "#FF8042", "#996633", "#009900"];
  const renderPie = (
    <>
      <p>Emission by Sector</p>
      <PieChart width={400} height={400}>
        <Pie data={data3} />
      </PieChart>
    </>
  );
  const renderLabel = (entry) => {
    return entry.Sector
  };

  return (
    <div className="container-chart">
      <p>Emission by Sector</p>
      <PieChart width={800} height={400}>
        <Tooltip></Tooltip>
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
