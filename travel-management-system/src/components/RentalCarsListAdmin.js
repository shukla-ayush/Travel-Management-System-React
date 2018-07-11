import React, {Component} from 'react'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import OwnerService from "../services/OwnerService";
import RentalCarsService from "../services/RentalCarsService";
import RentalCarsListItem from "./RentalCarsListItem";

export default class RentalCarsListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            owner: '',
            cars: [],
            fuel: '',
            address: '',
            air_conditioning: '',
            rate: '',
            category: '',
            startDate: moment('2018-06-01'),
            endDate: moment('2018-06-01'),
            transmission: '',
            type: ''
        };

        this.createCar = this.createCar.bind(this)
        this.userNameChanged = this.userNameChanged.bind(this)
        this.deleteCar = this.deleteCar.bind(this)
        this.populateCar = this.populateCar.bind(this)
        this.updateCar = this.updateCar.bind(this)
        this.findAllCars = this.findAllCars.bind(this)
        this.carService = RentalCarsService.instance
        this.ownerService = OwnerService.instance
        this.setCars = this.setCars.bind(this)
        this.setTransmission = this.setTransmission.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setCategory = this.setCategory.bind(this)
        this.setRate = this.setRate.bind(this)
        this.setFuel = this.setFuel.bind(this)
        this.setType = this.setType.bind(this)
        this.setStartDate = this.setStartDate.bind(this)
        this.setEndDate = this.setEndDate.bind(this)
        this.setAC = this.setAC.bind(this)
        this.setOwner = this.setOwner.bind(this)
    }


    componentDidMount() {
        this.findAllCars();
    }

    componentWillReceiveProps(newProps) {
        this.findAllCars();
    }

    renderListOfCars() {
        let cars = null;
        if (this.state) {
            cars = this.state.cars.map((car) => {
                    return <RentalCarsListItem key={car.id}
                                               car={car}
                                               deleteCar={this.deleteCar}
                                               populateCar={this.populateCar}/>
                }
            );
        }
        return (
            cars
        )
    }

    setAC(event) {
        this.setState({
            air_conditioning: event.target.value
        })
    }

    setTransmission(event) {
        this.setState({
            transmission: event.target.value
        })
    }

    setCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    setAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    setRate(event) {
        this.setState({
            rate: event.target.value
        })
    }

    setType(event) {
        this.setState({
            type: event.target.value
        })
    }

    setStartDate(event) {
        this.setState({
            startDate: moment(event.target.value)
        })
    }

    setEndDate(event) {
        this.setState({
            endDate: moment(event.target.value)
        })
    }

    setFuel(event) {
        this.setState({
            fuel: event.target.value
        })
    }

    userNameChanged(event) {
        this.setState({
            ownerName: event.target.value
        })
    }

    setOwner() {
        this.ownerService
            .findOwnerByUsername(this.state.ownerName)
            .then((owner1) => {
                (owner1.length === 0) ? window.alert("Username incorrect") : this.setState({owner: owner1[0]})
            });
    }

    setCity(event) {
        this.setState({
            city: event.target.value
        })
    }

    deleteCar(carId) {
        var answer = window.confirm("Click Ok to delete");
        if (answer == true) {
            this.carService
                .deleteCar(carId)
                .then(() => {
                        this.findAllCars()
                    }
                );
        }
    }


    populateCar(car) {
        this.setState({
            id: car._id,
            type: car.type,
            address: car.address,
            category: car.category,
            fuel: car.fuel,
            air_conditioning: car.air_conditioning,
            rate: car.rate,
            transmission: car.transmission,
            startDate: car.startDate,
            endDate: car.endDate,
        })
    }

    createCar() {
        this.carService
            .createCar(this.state.owner._id, this.state.category, this.state.type, this.state.fuel, this.state.air_conditioning,
                this.state.transmission, this.state.address, this.state.startDate.format("YYYY-MM-DD"),
                this.state.endDate.format("YYYY-MM-DD"), this.state.rate)
            .then(() => {
                this.findAllCars();
            });
    }

    updateCar() {
        this.carService
            .updateCar(this.state.id, this.state.category, this.state.type, this.state.fuel, this.state.air_conditioning,
                this.state.transmission, this.state.address, this.state.startDate,
                this.state.endDate, this.state.rate)
            .then(() => {
                    this.findAllCars()
                }
            );
    }

    setCars(crs) {
        this.setState({
            cars: crs
        })
    }

    findAllCars() {
        this.carService
            .findAllCars()
            .then(response => {
                this.setCars(response)
            })
    }

    render() {
        return (
            <Switch>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4" style={{overflow: 'scroll'}}>
                            <h2 style={{textAlign: "center"}}>Cars</h2>
                            <br/>
                            <ul className="list-group">
                                {this.renderListOfCars()}
                            </ul>
                            <br/>
                        </div>
                        <div className="col-sm-8" style={{overflow: 'scroll'}}>
                            <br/>
                            <br/>
                            <h3 style={{textAlign: 'center'}}>Add Cars</h3>
                            <br/>
                            <label>Please fill the username of Car owner first first</label>
                            <input onChange={this.userNameChanged}
                                   value={this.state.ownerName}
                                   placeholder="Enter Owner's username"
                                   className="form-control text-center font-weight-bold"/>
                            <button onClick={this.setOwner}
                                    className="btn btn-block btn-primary">
                                Click to verify username
                            </button>
                            <br/>
                            <input onChange={this.setCategory}
                                   value={this.state.category}
                                   placeholder="Add Car Category"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setType}
                                   value={this.state.type}
                                   placeholder="Add Car Type"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setFuel}
                                   value={this.state.fuel}
                                   placeholder="Add Car Fuel"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setAC}
                                   value={this.state.air_conditioning}
                                   placeholder="Add Car Air-Conditioning"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setTransmission}
                                   value={this.state.transmission}
                                   placeholder="Add Car Transmission"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type="date"
                                   onChange={this.setStartDate}
                                   value={this.state.startDate}
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type="date"
                                   onChange={this.setEndDate}
                                   value={this.state.endDate}
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setAddress}
                                   value={this.state.address}
                                   placeholder="Add Car Provider's address"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setRate}
                                   value={this.state.rate}
                                   placeholder="Add Car Rate"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <button onClick={this.createCar} className="btn btn-dark btn-block">
                                <i className="fa fa-plus"></i>
                            </button>
                            <br/>
                            <button onClick={this.updateCar} className="btn btn-dark btn-block">
                                <i className="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </Switch>
        )
    }
}