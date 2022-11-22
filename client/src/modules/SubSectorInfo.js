export default function SubSectorInfo(props){
    let subSectors = [];
    data4.map((data4) => {
      if (data4.sector == props.sector) {
        subSectors.push(data4);
      }
    });
    console.log(subSectors);
    return (
      <div className="container-chart-subsector">
        <h3>Sub sector</h3>
        <ul className="subsector-list">
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
  