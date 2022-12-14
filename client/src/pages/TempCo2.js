import './TempCo2.css';
import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import VostokIceLineChart from "../components/VostokIceLineChart";
import EvoGlobalTempBiaxiallinechart from "../components/EvoGlobalTempBiaxiallinechart";

// maxWindowWidth: Horizontal window width limit for more mobile friendly solution

export default function TempCo2(props){
    return(
        <div className="tempco2">
            <ClimateLineChart/>
            <AtmosphericCO2LineChart/>
            <VostokIceLineChart/>
            <Composite800kLineChart/>
            <EvoGlobalTempBiaxiallinechart/>
            <StackedLineChart maxWindowWidth={props.maxWindowWidth}/>
            <></>
        </div>
        
    )
}