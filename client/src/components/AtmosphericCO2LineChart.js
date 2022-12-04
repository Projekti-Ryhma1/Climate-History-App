import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
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
        data={antarcticIce}
      >
        <YAxis type="number" domain={["auto", "auto"]} />

        <Line
          xAxisId={2}
          type="monotone"
          dataKey="C02Ratio2"
          name="C02Ratio2"
          dot={false}
          stroke="red"
        />
        <Line
          xAxisId={1}
          type="monotone"
          dataKey="C02Ratio"
          name="C02Ratio"
          dot={false}
          stroke="green"
        />
        <Line
          xAxisId={3}
          type="monotone"
          dataKey="C02Ratio3"
          name="C02Ratio3"
          dot={false}
          stroke="blue"
        />
        <XAxis
          type="number"
          domain={["dataMin - 826" , "dataMax"]}
          xAxisId={2}
          dataKey="MeanAirAge2"
          
        />
        <XAxis
          type="number"
          domain={["dataMin - 834" , "dataMax + 9"]}
          xAxisId={1}
          dataKey="MeanAirAge"
          interval="preserveStartEnd"
        />
        <XAxis
          type="number"
          domain={["dataMin" , "dataMax + 19"]}
          xAxisId={3}
          dataKey="MeanAirAge3"
          interval="preserveStartEnd"
        />
        <Tooltip />
        <Legend />
      </LineChart>
      <LineChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        width={800}
        height={400}
      >
        <Line
          yAxisId="maunaLoa"
          xAxisId="annual"
          data={maunaLoaAnnual}
          stroke="red"
          strokeWidth={2}
          type="monotone"
          dataKey="mean"
          name="CO2 Concentration annual"
          dot={false}
        />
        <Line
          yAxisId="maunaLoa"
          xAxisId="monthly"
          data={maunaLoaMonthly}
          stroke="green"
          strokeWidth={2}
          type="monotone"
          dataKey="average"
          name="CO2 Concentration monthly"
          dot={false}
        />
        <XAxis
          xAxisId="annual"
          dataKey="year"
          type="number"
          domain={[1958, 2022]}
          interval="preserveStartEnd"
          scale="linear"
        />
        <XAxis xAxisId="monthly" dataKey="year" interval="preserveStartEnd" />
        <YAxis yAxisId="maunaLoa" type="number" domain={[300, 430]} />

        <CartesianGrid strokeDasharray="3 3" />

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
