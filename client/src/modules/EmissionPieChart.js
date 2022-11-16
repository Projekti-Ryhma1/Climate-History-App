import { Pie, PieChart } from "recharts";

export default function EmissionPieChart() {
  const renderPie = (
    <>
    <p>Emission by Sector</p>
      <PieChart width={400} height={400}>
        <Pie data={data3} />
      </PieChart>
    </>
  );
  return ( <div>
    <p>Emission by Sector</p>
      <PieChart width={400} height={400}>
        <Pie data={data3} dataKey="emissions" />
     </PieChart>
  </div>)
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
    Sector: "Agriculture, Forestry & Land Use (AFOLU)",
    emissions: 18.4,
  },
];
