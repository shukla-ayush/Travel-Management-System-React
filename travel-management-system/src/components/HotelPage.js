import React, {Component} from 'react'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import HotelService from '../services/HotelService.js'
import HotelList from "./HotelList";
import {BrowserRouter as Router} from "react-router-dom";


export default class HotelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            checkIn: moment('2018-06-01'),
            checkOut: moment('2018-06-01'),
            radius: '10',
            inputText: '',
            hotels: [],
            dbHotels: []
        };
        this.inputTextChanged = this.inputTextChanged.bind(this);
        this.findAllHotels = this.findAllHotels.bind(this);
        this.findAllHotelsByLatLong = this.findAllHotelsByLatLong.bind(this);
        this.checkInDateChange = this.checkInDateChange.bind(this);
        this.checkOutDateChange = this.checkOutDateChange.bind(this);
        this.hotelService = HotelService.instance;
    }

    checkInDateChange(event) {
        this.setState({
            checkIn: moment(event.target.value)
        });
    }

    validateForm() {
        var now = moment();
        return this.state.checkIn >= now &&
            this.state.checkOut > now &&
            this.state.inputText.length > 0;
    }

    inputTextChanged(event) {
        this.setState({
            inputText: event.target.value
        });
    }

    checkOutDateChange(event) {
        this.setState({
            checkOut: moment(event.target.value)
        });
    }

    findAllHotels() {
        this.hotelService
            .findDbHotelByCity(this.state.inputText)
            .then((result) => {
                this.setState({
                    dbHotels: result
                })
            });
        this.hotelService
            .findLatLongOfHotel(this.state.inputText)
            .then((results) => {
                this.setLatLong(results);
            })
            .then(() => this.findAllHotelsByLatLong());
    }

    setLatLong(results) {
        this.setState({
            latitude: results.results[0].geometry.location.lat,
            longitude: results.results[0].geometry.location.lng
        })
    }

    findAllHotelsByLatLong() {
        this.hotelService
            .findAllHotelsByLatLong(this.state.latitude,
                this.state.longitude,
                this.state.checkIn.format("YYYY-MM-DD"),
                this.state.checkOut.format("YYYY-MM-DD"),
                this.state.radius)
            .then((result) => {
                this.setState({
                    hotels: result.results
                })
            });
    }


    render() {
        return (
            <Router>
                <div>
                    <div className="search align-content-center">
                        <form>
                            <div className="form-row align-content-center search">
                                <div className="form-inline row">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Location</span>
                                    </div>
                                    <input className="form-control space-right"
                                           type="text"
                                           placeholder="Location"
                                           onChange={this.inputTextChanged}
                                           aria-label="Search"
                                           ref="searchValue"/>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">CheckIn</span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control space-right"
                                        onChange={this.checkInDateChange}
                                    />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">CheckOut</span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control space-right"
                                        onChange={this.checkOutDateChange}
                                    />
                                    <button className="fa fa-search btn " aria-hidden="true"
                                            type="button"
                                            disabled={!this.validateForm()}
                                            onClick={this.findAllHotels}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <HotelList data={this.state.hotels} data2={this.state.dbHotels}/>
                    </div>
                </div>
            </Router>
        )
    }
}