import React from 'react';
import './App.css';
import 'whatwg-fetch';
import Plot from './Plot';

const API_KEY = "02e46c6f8170accfb56f70b9f3ffd189";

class App extends React.Component{
    state = {
        location: '',
        data: {},
        dates: [],
        temps: []
    };

    fetchData = (evt) => {
        evt.preventDefault();
        //console.log(evt.target.location.value);
        let location = encodeURIComponent(this.state.location);
        let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
        let url = urlPrefix + location + urlSuffix;

        fetch(url)
            .then(function(response){
                return response.json()
            }).then( json => {
                var list = json.list;
                var dates = [];
                var temps = [];
                for (var i = 0; i < list.length; i++){
                    dates.push(list[i].dt_txt);
                    temps.push(list[i].main.temp);
                } 

                this.setState({
                    data: json,
                    dates: dates,
                    temps: temps
                });
            }).catch(function(ex){
                console.log('parsing failed', ex)
            });
    };

    changeLocation = (evt) => {
        this.setState({
            location: evt.target.value
        });
    };

    render(){
        let currentTemp = 'Specify a location';
        if (this.state.data.list){
            currentTemp = this.state.data.list[0].main.temp;
        }

        return (
            <div>
            <h1>das Wetter</h1>
            <form onSubmit={this.fetchData}>
                <label>Let's find out the weather for
                    <input type="text" id='location'
                        placeholder={"City, Country"}
                        value={this.state.location}
                        onChange={this.changeLocation}
                    />
                </label>
            </form>
            <p className="temp-wrapper">
                <span className='temp'>{ currentTemp }</span>
                <span className='temp-symbol'>°C</span>
            </p>
            <h2>Forecast</h2>
            <Plot 
                xData={this.state.dates}
                yData={this.state.temps}
                type="scatter"
            />
            </div>
        );
    }
}

export default App;
