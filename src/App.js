import React from 'react';
import { connect } from 'react-redux';

import './App.css';
<<<<<<< HEAD
import 'whatwg-fetch';

import Plot from './Plot';

import {
    changeLocation
} from './actions';
=======
import 'whatwg-fetch'
>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404

const API_KEY = "02e46c6f8170accfb56f70b9f3ffd189";

class App extends React.Component{
    state = {
        location: '',
<<<<<<< HEAD
        data: {},
        dates: [],
        temps: [],
        selected: {}
    };

    onPlotClick = (data) => {
        if (data.points) {
            this.setState({
                selected: {
                    date: data.points[0].x,
                    temp: data.points[0].y
                }
            });
        }
    }

=======
        data: {}
    };

>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404
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
<<<<<<< HEAD
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
                    selected: {
                        date: '',
                        temp: null
                    }
                });
            }).catch(function(ex){
                console.log('parsing failed', ex)
            });
=======
                this.setState({
                    data: json
                });
            }).catch(function(ex){
                console.log('parsing failed', ex)
            })
>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404
    };

    changeLocation = (evt) => {
        this.setState({
            location: evt.target.value
        });
<<<<<<< HEAD
        this.props.dispatch(changeLocation(evt.target.value));
=======
>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404
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
<<<<<<< HEAD
                        value={this.props.location}
=======
                        value={this.state.location}
>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404
                        onChange={this.changeLocation}
                    />
                </label>
            </form>
<<<<<<< HEAD
            {(this.state.data.list) ? (
                <div className='wrapper'>
                    { /* Render the current temperature if no specific date is selected */ }
                    <p className="temp-wrapper">
                        <span className='temp'>
                            { this.state.selected.temp ? this.state.selected.temp : currentTemp }
                        </span>
                        <span className='temp-symbol'>°C</span>
                        <span className='temp-date'>
                            { this.state.selected.temp ? this.state.selected.date : '' }
                        </span>
                    </p>
                    <h2>Forecast</h2>
                    <Plot 
                        xData={this.state.dates}
                        yData={this.state.temps}
                        onPlotClick={this.onPlotClick}
                        type="scatter"
                    />
                </div>
            ) : null}
=======
            <p className="temp-wrapper">
                <span className='temp'>{ currentTemp }</span>
                <span className='temp-symbol'>°C</span>
            </p>
>>>>>>> 70dda0239c39b2379ad2d1a154754eab3c9e3404
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        location: state.location
    };
}

export default connect(mapStateToProps)(App);
