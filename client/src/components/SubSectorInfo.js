import { useEffect, useState } from "react";
import axios from "axios";

export default function SubSectorInfo(props) {
  const [subSectorData, setSubSectorData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("subSectorData") !== null) {
      setSubSectorData(JSON.parse(localStorage.getItem("subSectorData")));
    } else {
      const address = "http://localhost:3001/data/subsector_emissions";
      axios
        .get(address)
        .then((response) => {
          setSubSectorData(response.data);
          localStorage.setItem("subSectorData", JSON.stringify(response.data));
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);


  /**
   * sort data so that it shows correct subsector data compared to parents active sector
   */
  let subSectors = [];  
  subSectorData.map((data4) => {
    if (data4.sector === props.sector) {
      subSectors.push(data4);
    }
  });
  return (
    <div className="container-chart-subsector">
      <h3>Sub sector emissions</h3>
      <ul className="subsector-list">
        {subSectors.map((subSectors) => (
          <li key={subSectors.Sub_sector}>
            {subSectors.Sub_sector} &nbsp;
            {subSectors.Emissions}%
          </li>
        ))}
      </ul>
    </div>
  );
}
