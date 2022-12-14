import { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ComposedChart,
  Scatter,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import "./charts.css";

// V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958
// V4 Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements
// V10 Human Evolution and Activities

export default function AtmosphericCO2LineChart() {
  const [showMonthlyData, setShowMonthlyData] = useState(false);
  const [showIceData, setShowIceData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [maunaLoaAnnual, setMaunaLoaAnnual] = useState([]);
  const [maunaLoaMonthly, setMaunaLoaMonthly] = useState([]);
  const [antarcticIce, setAntarcticIce] = useState([]);
  const [humanActivities, setHumanActivities] = useState([]);
  const [xAxisMin, setXAxisMin] = useState(1958);
  const [description, setDescription] = useState();

  useEffect(() => {
    setDescription("We have confidence that the CO2 measurements made at the Mauna Loa Observatory reflect truth about "+
    "our global atmosphere. The main reasons for that confidence are: The Observatory near the summit of Mauna Loa, at an "+
    "altitude of 3400 m, is well situated to measure air masses that are representative of very large areas. All of the "+
    "measurements are rigorously and very frequently calibrated. Ongoing comparisons of independent measurements at the "+
    "same site allow an estimate of the accuracy, which is generally better than 0.2 ppm."); // V3
    
    if (localStorage.getItem("maunaloaannual") !== null) {
      setMaunaLoaAnnual(JSON.parse(localStorage.getItem("maunaloaannual")));
    } else {
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/mauna_loa_annual";
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
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/mauna_loa_monthly";
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
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/antarctic_ice_core";
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
    if (localStorage.getItem("humanActivities") !== null) {
      setHumanActivities(JSON.parse(localStorage.getItem("humanActivities")));
    } else {
      const address =
        process.env.REACT_APP_API_ADDRESS + "/data/human_evolution_activities";
      axios
        .get(address)
        .then((response) => {
          setHumanActivities(response.data);
          localStorage.setItem(
            "humanActivities",
            JSON.stringify(response.data)
          );
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
    setDescription("We have confidence that the CO2 measurements made at the Mauna Loa Observatory reflect truth about "+
    "our global atmosphere. The main reasons for that confidence are: The Observatory near the summit of Mauna Loa, at an "+
    "altitude of 3400 m, is well situated to measure air masses that are representative of very large areas. All of the "+
    "measurements are rigorously and very frequently calibrated. Ongoing comparisons of independent measurements at the "+
    "same site allow an estimate of the accuracy, which is generally better than 0.2 ppm."); // V3

  }
  function handleIceCoreData() { // V10
    if (showIceData) {
      //hide monthly data
      setShowMonthlyData(false);
      //if is showing ice data hide it & set xaxis to correct year
      setXAxisMin(1958);
      setShowIceData(false);
    } else {
      //hide monthly data
      setShowMonthlyData(false);
      //if not showing ice data show it & set xaxis to correct year
      setXAxisMin(1006);
      setShowIceData(true);
    }
    setDescription("The CO2 records presented here are derived from three ice cores obtained at Law Dome, East Antarctica "+
    "from 1987 to 1993. The Law Dome site satisfies many of the desirable characteristics of an ideal ice core site for "+
    "atmospheric CO2 reconstructions including negligible melting of the ice sheet surface and low concentrations"); // V4
  }

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">Event</p>
          <p className="desc">{payload[0].payload.event}</p>
        </div>
      );
    }
  };
  const tooltipFormatter = ({ value, name }) => {
    if (name === "Human Activities") return <CustomTooltip />;
    return;
  };

  const renderChart = (
    <>
    <p className="headline">Atmospheric CO2 concentrations from Mauna Loa (V3,V4,V10)</p>
        <p className="description">
          {description}
        </p>
      <ResponsiveContainer width={'100%'} height={400}>
      <ComposedChart
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        width={800}
        height={400}
      >
        <Tooltip
          tooltipFormatter={tooltipFormatter}
          content={<CustomTooltip />}
        />
        <XAxis
          hide={true}
          data={humanActivities}
          dataKey="years"
          type="number"
          domain={[xAxisMin, 2022]}
          allowDataOverflow={true}
        ></XAxis>
        <Scatter
          data={humanActivities}
          name="Human Activities"
          dataKey="loc"
        ></Scatter>
        <YAxis type="number" domain={["auto", 420]} />
        <Line
          xAxisId="annual"
          data={maunaLoaAnnual}
          stroke="#8809F6"
          strokeWidth={2}
          type="monotone"
          dataKey="mean"
          name="CO2 Concentration annual"
          dot={false}
          activeDot={false}
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
          activeDot={false}
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

        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={1}
          type="monotone"
          dataKey="C02Ratio"
          name="Ice Core DE08 CO2"
          dot={false}
          stroke="green"
          strokeWidth={2}
          activeDot={false}
        />
        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={2}
          type="monotone"
          dataKey="C02Ratio2"
          name="Ice Core DE08-2 CO2"
          dot={false}
          stroke="red"
          strokeWidth={2}
          activeDot={false}
        />
        <Line
          hide={!showIceData}
          data={antarcticIce}
          xAxisId={3}
          type="monotone"
          dataKey="C02Ratio3"
          name="Ice Core DSS"
          dot={false}
          stroke="#2167de"
          strokeWidth={2}
          activeDot={false}
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
      </ComposedChart>
      </ResponsiveContainer>
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
