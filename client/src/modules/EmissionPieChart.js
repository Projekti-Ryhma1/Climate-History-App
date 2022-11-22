import { useState, useCallback } from "react";
import { LabelList, Cell, Pie, PieChart, Sector } from "recharts";
import "./EmissionPieChart.css";

/** TODO
 *  axios calls to get data from database
 *  show indepth information on Sector on click
 *  use spinner when loading etc
 *  make it look nice?
 */

export default function EmissionPieChart() {
  const COLORS = ["#ffff00", "#FF8042", "#996633", "#009900"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorName, setSectorName] = useState("");
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      name,
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
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 10}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${name}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 10}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(C02 Emissions ${(percent * 100).toFixed(2)}%)`}
        </text>
      </>
    );
  };
  const SubSectorInfo = (props) => {
    let subSectors = [];
    data4.map((data4) => {
      if (data4.sector == props.sector) {
        subSectors.push(data4);
      }
    });
    console.log(subSectors);
    return (
      <div>
        <h3>Sub sector</h3>
        <ul>
          {subSectors.map((subSectors) => (
            <li key={subSectors.Sub_sector}>
              {subSectors.Sub_sector}
              {subSectors.Emissions}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
      switch (index) {
        case 0:
          setSectorName("Energy");
          break;
        case 1:
          setSectorName("Industrial processes");
          break;
        case 2:
          setSectorName("Waste");
          break;
        case 3:
          setSectorName("Agriculture, Forestry & Land Use");
          break;
        default:
          setSectorName("Energy");
          break;
      }
    },
    [setActiveIndex]
  );
  const renderPie = <></>;
  return (
    <div className="container-chart">
      <p>Emission by Sector</p>
      <PieChart width={1000} height={500}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data3}
          dataKey="emissions"
          cx="50%"
          cy="50%"
          /* label={renderLabel} */
          paddingAngle="1"
          onMouseEnter={onPieEnter}
        >
          {data3.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <SubSectorInfo sector={sectorName}></SubSectorInfo>
    </div>
  );
}

const data3 = [
  {
    name: "Energy",
    emissions: 73.2,
  },
  {
    name: "Industrial processes",
    emissions: 5.2,
  },
  {
    name: "Waste",
    emissions: 3.2,
  },
  {
    name: "Agriculture, Forestry & Land Use",
    emissions: 18.4,
  },
];
const data4 = [
  {
    Sub_sector: "Transport",
    Emissions: "16.2",
    sector: "Energy",
  },
  {
    Sub_sector: "Energy in buildings (elec and heat)",
    Emissions: "17.5",
    sector: "Energy",
  },
  {
    Sub_sector: "Energy in industry",
    Emissions: "24.2",
    sector: "Energy",
  },
  {
    Sub_sector: "Energy in Agri & Fishing",
    Emissions: "1.7",
    sector: "Energy",
  },
  {
    Sub_sector: "Unallocated fuel combustion",
    Emissions: "7.8",
    sector: "Energy",
  },
  {
    Sub_sector: "Fugitive emissions from energy",
    Emissions: "5.8",
    sector: "Energy",
  },
  {
    Sub_sector: "Cement",
    Emissions: "3",
    sector: "Industrial processes",
  },
  {
    Sub_sector: "Chemical & petrochemical (industrial)",
    Emissions: "2.2",
    sector: "Industrial processes",
  },
  {
    Sub_sector: "Livestock & Manure",
    Emissions: "5.8",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Rice Cultivation",
    Emissions: "1.3",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Agricultural Soils",
    Emissions: "4.1",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Crop Burning",
    Emissions: "3.5",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Forest Land",
    Emissions: "2.2",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Cropland",
    Emissions: "1.4",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Grassland",
    Emissions: "0.1",
    sector: "Agriculture, Forestry & Land Use",
  },
  {
    Sub_sector: "Landfills",
    Emissions: "1.9",
    sector: "Waste",
  },
  {
    Sub_sector: "Wastewater",
    Emissions: "1.3",
    sector: "Waste",
  },
];
