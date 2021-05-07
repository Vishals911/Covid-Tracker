import react,{useState,useEffect} from "react";
import { fetchDailyData } from "../../API";
import styles from "./Chart.module.css";
import {Line, Bar} from "react-chartjs-2";

const Chart = ({data:{confirmed,recovered,deaths}, country}) =>{
    const [dailyData,setDailyData] = useState([]);
    useEffect(()=>{
        const fetchAPI = async () =>{
            const initialDailyData = await fetchDailyData();
            setDailyData(initialDailyData);
        };
        console.log(dailyData);
        fetchAPI();
    },[]);


    const linechart = (

        dailyData.length
        ?
        <Line
        data = {{
            labels : dailyData.map(({date}) => date),
            datasets:[{
                data: dailyData.map(({confirmed}) => confirmed),
                label : 'Infected',
                borderColor: '#3333ff',
                fill: true,
            },
            {
                
                data: dailyData.map(({deaths}) => deaths),
                label : 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true,
            }]
        }}
        /> : null
    );

    const barchart = (
        confirmed ?
        <Bar 
        data = {{
            labels: ['Infected' , 'Recovered' , 'Deaths'],

            datasets : [{
                label : 'People',
                backgroundColor: [
                    'rgba(0,0,255,0.5',
                    'rgba(0,255,0,0.5',
                    'rgba(255,0,0,0.5',
                ],
                data:[confirmed.value,recovered.value,deaths.value]   
            }]
        }}
        options= {{
            legend :{display : false},
            title :{diplay: true , text : `Currect State is ${country}`},
        }}
        />
        : null

    )
    return(
            <div className = {styles.container}>
                {country ? barchart : linechart}
            </div>
    );
}



export default Chart;