import React from 'react';
import {Cards,Chart,CountryPicker} from "./Components";
import styles from "./App.module.css";
import {fetchData} from "./API";
class App extends React.Component{
    state = {
        data :{}
    }
    async componentDidMount(){
        const fetcheddata = await fetchData();
        
        this.setState({data : fetcheddata});
    }

    render() {
        const {data} = this.state;
        return (
            <div className= {styles.container}>
                <Cards data={data} />
                <CountryPicker />
                <Chart />
            </div>
        );
    }
}

export default App;