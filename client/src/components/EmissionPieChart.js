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

// V9 CO2 emissions by sectors

export default function EmissionPieChart(props) {
  const COLORS = ["#ffff00", "#FF8042", "#996633", "#009900"];
  const [isMobileView, setMobileSize] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorName, setSectorName] = useState("");
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setMobileSize(window.innerWidth < props.maxWindowWidth);
    });

    if (localStorage.getItem("sectorData") !== null) {
      setSectorData(JSON.parse(localStorage.getItem("sectorData")));
    } else {
      const address = process.env.REACT_APP_API_ADDRESS + "/data/sector_emissions";
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
    <div>
      <p className="headline"> CO2 emissions by sectors (V9)</p>
      <p className="description">
        Emmission piechart is to view how much carbondioxide humanity spread in the air on average in different gategories.
      </p>
      </div>
      <ResponsiveContainer width={300} height={200}>
        <SubSectorInfo sector={sectorName} width={200} height={200} />
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={500}
      >
        <PieChart width="50%" height={500} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={<RenderActiveShape sectorName={sectorName} />}
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
    </>

  );



  return (
    <div className="container-chart-pie">
      {isLoading ? <Spinner /> : renderPie}
    </div>
  );
}
