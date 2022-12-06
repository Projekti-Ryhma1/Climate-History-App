import axios from "axios";
import {useState, useEffect} from "react";

export default function EvoGlobalTempBiaxiallinechart() {
    const [isLoading, setIsLoading] = useState(true);
    const [evoData, setEvoData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("evoglobaltemp2myr")) {
            setEvoData(JSON.parse(localStorage.getItem("evoglobaltemp2myr")));
        } else {
            const address = "http://localhost:3001/data/evo_of_global_temp_2m_years";
    
            axios.get(address)
            .then(resp => {
                setEvoData(resp.data);
                localStorage.setItem("evoglobaltemp2myr", JSON.stringify(resp.data));
            })
            .catch(error => {
                alert(error);
            })
        }
        setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }, []);


}