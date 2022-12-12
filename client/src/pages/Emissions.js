import EmissionPieChart from "../components/EmissionPieChart";

export default function Emissions(props){

    return(
        <div>
            <EmissionPieChart maxWindowWidth={props.maxWindowWidth} />
        </div>
    )
}