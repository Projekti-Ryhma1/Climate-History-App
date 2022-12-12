import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import VostokIceLineChart from "../components/VostokIceLineChart";
import EvoGlobalTempBiaxiallinechart from "../components/EvoGlobalTempBiaxiallinechart";

export default function TempCo2(){
    return(
        <div>
            <Composite800kLineChart/>
            <AtmosphericCO2LineChart/>
            <ClimateLineChart/>
            <StackedLineChart/>
            <VostokIceLineChart/>
            <EvoGlobalTempBiaxiallinechart/>
            <></>
        </div>
    )
}