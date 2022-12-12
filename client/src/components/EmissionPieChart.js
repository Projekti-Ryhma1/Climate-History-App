import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./EmissionPieChart.css";
import Spinner from "./Spinner";
import SubSectorInfo from "./SubSectorInfo";
import RenderActiveShape from "./RenderActiveShape";

/** TODO
 *  Make subsector info a modal window or something nicer?
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
      const address =  process.env.REACT_APP_API_ADDRESS + "/data/sector_emissions";
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
            activeShape={<RenderActiveShape sectorName={sectorName}/>}
            data={sectorData}
            dataKey="emissions"
            cx="50%"
            cy="50%"
            paddingAngle="1"
            onMouseEnter={onPieEnter}
          >
            {sectorData.map((entry, index) => (
              <Cell key={++index} fill={COLORS[index % COLORS.length]} />
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
