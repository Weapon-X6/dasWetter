import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import 'whatwg-fetch';

import Plot from './Plot';

import {
    changeLocation,
    setSelectedDate,
    setSelectedTemp
} from './actions';

const API_KEY = "02e46c6f8170accfb56f70b9f3ffd189";

class App extends React.Component{
    state = {
        data: {},
        dates: [],
        temps: []
    };

    onPlotClick = (data) => {
        if (data.points) {
            const pointNumber = data.points[0]; 
            this.props.dispatch(setSelectedDate(pointNumber.x));
            this.props.dispatch(setSelectedTemp(pointNumber.y));
        }
    }

    fetchData = (evt) => {
        evt.preventDefault();

        let location = encodeURIComponent(this.props.location);
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
                    temps: temps,
                });

                this.props.dispatch(setSelectedDate(''));
                this.props.dispatch(setSelectedTemp(null));
            }).catch(function(ex){
                console.log('parsing failed', ex)
            });
    };

    changeLocation = (evt) => {
        this.props.dispatch(changeLocation(evt.target.value));
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
                <label>Let's find out the weather for &nbsp;
                    <input type="text" id='location'
                        placeholder={"City, Country"}
                        value={this.props.location}
                        onChange={this.changeLocation}
                    />
                </label>
            </form>
            {(this.state.data.list) ? (
                <div className='wrapper'>
                    { /* Render the current temperature if no specific date is selected */ }
                    {(this.props.selected.temp) ? (
                        <p>The themperature on { this.props.selected.date } will be { this.props.selected.temp }°C</p>
                    ) : (
                        <p>The current temperature is { currentTemp }</p>
                    )
                    }  
                    <h2>Forecast</h2>
                    <Plot 
                        xData={this.state.dates}
                        yData={this.state.temps}
                        onPlotClick={this.onPlotClick}
                        type="scatter"
                    />
                </div>
            ) : null}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        location: state.location,
        selected: state.selected
    };
}

export default connect(mapStateToProps)(App);
