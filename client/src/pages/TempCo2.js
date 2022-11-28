import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";

export default function TempCo2(){
    return(
        <div>
            <AtmosphericCO2LineChart/>
            <ClimateLineChart/>
            <StackedLineChart/>
        </div>
    )
}