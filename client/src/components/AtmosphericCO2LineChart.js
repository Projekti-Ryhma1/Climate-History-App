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
  const [showIceData, setShowIceData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [maunaLoaAnnual, setMaunaLoaAnnual] = useState([]);
  const [maunaLoaMonthly, setMaunaLoaMonthly] = useState([]);
  const [antarcticIce, setAntarcticIce] = useState([]);
  const [xAxisMin, setXAxisMin] = useState(1958);

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

  function handleMonthlyData() {
    if (showMonthlyData) {
      //if is showing monthly data hide it
      setShowMonthlyData(false);
    } else {
      //if not showing monthly data show it
      setShowMonthlyData(true);
    }
  }
  function handleIceCoreData() {
    if (showIceData) {
      setShowMonthlyData(false);

      setXAxisMin(1958);
      setShowIceData(false);
    } else {
      setShowMonthlyData(false);

      setXAxisMin(1006);
      setShowIceData(true);
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
          stroke="#8809F6"
          strokeWidth={2}
          type="monotone"
          dataKey="mean"
          name="CO2 Concentration annual"
          dot={false}
        />
        <Line
          hide={!showMonthlyData}
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
          hide={showIceData}
          xAxisId="annual"
          dataKey="year"
          type="number"
          domain={[xAxisMin, 2022]}
          interval="preserveStartEnd"
        />
        <XAxis
          xAxisId="monthly"
          dataKey="year"
          interval="preserveStartEnd"
          hide={true}
        />
        <YAxis type="number" domain={[300, 430]} />

        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={1}
          type="monotone"
          dataKey="C02Ratio"
          name="C02Ratio"
          dot={false}
          stroke="green"
          strokeWidth={2}
        />
        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={2}
          type="monotone"
          dataKey="C02Ratio2"
          name="C02Ratio2"
          dot={false}
          stroke="red"
          strokeWidth={2}
        />
        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={3}
          type="monotone"
          dataKey="C02Ratio3"
          name="C02Ratio3"
          dot={false}
          stroke="#2167de"
          strokeWidth={2}
        />
        <XAxis
          hide={true}
          type="number"
          domain={["dataMin - 834", "dataMax + 53"]}
          xAxisId={1}
          dataKey="MeanAirAge"
          interval="preserveStartEnd"
        />
        <XAxis
          hide={true}
          type="number"
          domain={["dataMin - 826", "dataMax + 44"]}
          xAxisId={2}
          dataKey="MeanAirAge2"
        />
        <XAxis
          hide={!showIceData}
          type="number"
          domain={["dataMin", "dataMax + 63"]}
          xAxisId={3}
          dataKey="MeanAirAge3"
          interval="preserveStartEnd"
        />

        <CartesianGrid strokeDasharray="3 3" />

        <Legend />
      </LineChart>
      <Button onClick={handleMonthlyData} disabled={showIceData}>
        Show monthly data
      </Button>
      <Button onClick={handleIceCoreData}>Show ice core data</Button>
    </>
  );
  return (
    <div className="container-chart">
      {isLoading ? <Spinner /> : renderChart}
    </div>
  );
}
