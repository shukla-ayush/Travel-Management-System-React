import React, {Component} from 'react'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import RentalCarsService from '../services/RentalCarsService.js'
import CarsList from "./CarsList";
import {BrowserRouter as Router} from "react-router-dom";


export default class RentalCarsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            pickUp: moment('2018-06-01'),
            dropOff: moment('2018-06-11'),
            radius: '10',
            location: '',
            cars: [],
            dbCars: []
        };
        this.locationChanged = this.locationChanged.bind(this);
        this.findAllCars = this.findAllCars.bind(this);
        this.findAllCarsByLatLong = this.findAllCarsByLatLong.bind(this);
        this.pickUpDateChange = this.pickUpDateChange.bind(this);
        this.dropOffDateChange = this.dropOffDateChange.bind(this);
        this.carService = RentalCarsService.instance;
    }

    locationChanged(event) {
        this.setState({
            location: event.target.value
        });
    }

    validateForm() {
        var now = moment();
        return this.state.pickUp >= now &&
            this.state.dropOff > now &&
            this.state.location.length > 0;
    }

    pickUpDateChange(event) {
        this.setState({
            pickUp : moment(event.target.value)
        });
    }

    dropOffDateChange(event) {
        this.setState({
            dropOff : moment(event.target.value)
        });
    }

    findAllCars(){
        this.carService
            .findDbCarsByLocation(this.state.location)
            .then((result) => {
                this.setState({
                    dbCars: result})
            });
        this.carService
            .findLatLongOfLocation(this.state.location)
            .then((results) => {
                this.setLatLong(results); })
            .then(() => this.findAllCarsByLatLong());

    }

    setLatLong(results){
        this.setState({
            latitude:  results.results[0].geometry.location.lat,
            longitude: results.results[0].geometry.location.lng })
    }

    findAllCarsByLatLong() {
        this.carService
            .findAllCarsByLatLong(this.state.latitude,
                this.state.longitude,
                this.state.pickUp.format("YYYY-MM-DD"),
                this.state.dropOff.format("YYYY-MM-DD"),
                this.state.radius)
            .then((result) => {
                this.setState({
                    cars: result.results})
            });
    }


    render() {
        return (
            <Router>
                <div>
                    <div className="search align-content-center">
                        <form>
                            <div className="form-row align-content-center search">
                                <div className=" form-inline row">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Location</span>
                                    </div>
                                    <input className="form-control space-right"
                                           type="text"
                                           placeholder="Location"
                                           onChange={this.locationChanged}
                                           aria-label="Search"
                                           ref="searchValue"/>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Pick Up</span>
                                    </div>
                                    <input
                                        type= "date"
                                        className="form-control space-right"
                                        onChange={this.pickUpDateChange}
                                    />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Drop Off</span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control space-right"
                                        onChange={this.dropOffDateChange}
                                    />
                                    <button className ="fa fa-search btn btn-secondary" aria-hidden="true"
                                            type="button"
                                            disabled={!this.validateForm()}
                                            onClick={this.findAllCars}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <CarsList data={this.state.cars} data2={this.state.dbCars}/>
                    </div>
                </div>
            </Router>
        )
    }
}