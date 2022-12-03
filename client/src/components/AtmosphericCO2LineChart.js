import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";

export default function AtmosphericCO2LineChart() {
  const [showMonthlyData, setShowMonthlyData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [maunaLoaAnnual, setMaunaLoaAnnual] = useState([]);
  const [maunaLoaMonthly, setMaunaLoaMonthly] = useState([]);
  const [antarcticIce, setAntarcticIce] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("maunaloaannual") !== null) {
      setMaunaLoaAnnual(JSON.parse(localStorage.getItem("maunaloaannual")));
    } else {
      const address = "http://localhost:3001/data/mauna_loa_annual";
      axios
        .get(address)
        .then((response) => {
          setMaunaLoaAnnual(response.data);
          localStorage.setItem("maunaloaannual", JSON.stringify(response.data));
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (localStorage.getItem("maunaloamonthly") !== null) {
      setMaunaLoaMonthly(JSON.parse(localStorage.getItem("maunaloamonthly")));
    } else {
      const address = "http://localhost:3001/data/mauna_loa_monthly";
      axios
        .get(address)
        .then((response) => {
          setMaunaLoaMonthly(response.data);
          localStorage.setItem(
            "maunaloamonthly",
            JSON.stringify(response.data)
          );
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (localStorage.getItem("antarcticice") !== null) {
      setAntarcticIce(JSON.parse(localStorage.getItem("antarcticice")));
    } else {
      const address = "http://localhost:3001/data/antarctic_ice_core";
      axios
        .get(address)
        .then((response) => {
          setAntarcticIce(response.data);
          localStorage.setItem("antarcticice", JSON.stringify(response.data));
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

  function handleClick() {
    if (showMonthlyData) {
      //if is showing monthly data hide it
      setShowMonthlyData(false);
    } else {
      //if not showing monthly data show it
      setShowMonthlyData(true);
    }
  }

  const renderChart = (
    <>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        width={800}
        height={400}
      >
        <Line
          xAxisId="annual"
          data={maunaLoaAnnual}
          hide={showMonthlyData}
          type="monotone"
          dataKey="mean"
          name="CO2 Concentration annual"
          dot={false}
        />
        <Line
          xAxisId="monthly"
          data={maunaLoaMonthly}
          hide={!showMonthlyData}
          type="monotone"
          dataKey="average"
          name="CO2 Concentration monthly"
          dot={false}
        />
        <XAxis
          xAxisId="annual"
          hide={showMonthlyData}
          dataKey="year"
          type="number"
          domain={["dataMin", "dataMax"]}
          angle={-55}
          tickMargin={20}
          interval= "preserveStartEnd"
          scale="linear"
        />
        <XAxis xAxisId="monthly" hide={!showMonthlyData} dataKey="year" />
        <YAxis data={maunaLoaAnnual} type="number" domain={[280, "auto"]} />



        <Tooltip />
        <Legend />
      </LineChart>
      <LineChart
       margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
       width={800}
       height={400}>
        <YAxis data={antarcticIce} type="number" domain={["auto", "auto"]} />

        <Line
          xAxisId="MeanAirAge"
          data={antarcticIce}
          type="monotone"
          dataKey="C02ratio2"
          name="C02ratio2"
        />
        <XAxis
          type="number"
          domain={["dataMin", 2021]}
          data={antarcticIce}
          xAxisId="MeanAirAge"
          dataKey="Meanairage2"
        />
        <Tooltip />
        <Legend />
      </LineChart>
      <Button onClick={handleClick}>Show monthly data</Button>
    </>
  );
  return (
    <div className="container-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
