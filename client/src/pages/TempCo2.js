import AtmosphericCO2LineChart from "../components/AtmosphericCO2LineChart";
import ClimateLineChart from "../components/ClimateLineChart";
import StackedLineChart from "../components/StackedLineChart";
import Composite800kLineChart from "../components/Composite800kLineChart";
import VostokIceLineChart from "../components/VostokIceLineChart";
import EvoGlobalTempBiaxiallinechart from "../components/EvoGlobalTempBiaxiallinechart";

// maxWindowWidth: Horizontal window width limit for more mobile friendly solution

export default function TempCo2(props){
    return(
        <div style={{marginTop: '10px', marginBottom: '50px'}}>
            <Composite800kLineChart/>
            <AtmosphericCO2LineChart/>
            <ClimateLineChart/>
            <StackedLineChart maxWindowWidth={props.maxWindowWidth}/>
            <VostokIceLineChart/>
            <EvoGlobalTempBiaxiallinechart/>
            <></>
        </div>
        
    )
}