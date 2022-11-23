import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { Cell, Pie, PieChart, Sector, ResponsiveContainer } from "recharts";
import "./EmissionPieChart.css";
import Spinner from "./Spinner";
import SubSectorInfo from "./SubSectorInfo";

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
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("sectorData") !== null) {
      setSectorData(JSON.parse(localStorage.getItem("sectorData")));
    } else {
      const address = "http://localhost:3001/data/sector_emissions";
      axios
        .get(address)
        .then((response) => {
          setSectorData(response.data);
          localStorage.setItem("sectorData", JSON.stringify(response.data));
        })
        .catch((error) => {
          alert(error);
        });
    }
    setTimeout(() => {
      //give 0.5s time for data to load
      setIsLoading(false);
    }, 500);
  }, []);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
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
        >{`${sectorName}`}</text>
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
  const renderPie = (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={1000} height={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={sectorData}
            dataKey="emissions"
            cx="50%"
            cy="50%"
            paddingAngle="1"
            onMouseEnter={onPieEnter}
          >
            {sectorData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <SubSectorInfo sector={sectorName}></SubSectorInfo>
    </>
  );
  return (
    <div className="container-chart-pie">
      {isLoading ? <Spinner /> : renderPie}
    </div>
  );
}
