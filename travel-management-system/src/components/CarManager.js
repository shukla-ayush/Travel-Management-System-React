import React, { Component } from "react";
import {Form, FormGroup, FormControl, ControlLabel,ListGroup, ListGroupItem} from "react-bootstrap";
import CarServiceClient from "../services/RentalCarsService";


export default class CarManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
                userId: "",
                address: "",
                transmission: "",
                fuel: "",
                air_conditioning: "",
                category: "",
                type: "",
                rate: "",
                startDate: "",
                endDate: ""
            };
        this.carService = CarServiceClient.instance;
        this.updateCar = this.updateCar.bind(this);
        this.setState({userId : this.props.match.params.userId});
        this.renderCar(this.props.match.params.userId);
    }

    validateForm() {
        return this.state.address.length > 0 &&
            this.state.transmission.length > 0 &&
            this.state.fuel.length > 0 &&
            this.state.type.length > 0 &&
            this.state.air_conditioning.length > 0 &&
            this.state.category.length > 0 &&
            this.state.rate.length > 0 &&
            this.state.startDate.length > 0 &&
            this.state.endDate.length
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    setCar(car) {
        this.setState({
            id: car._id,
            type: car.type,
            address: car.address,
            category: car.category,
            fuel: car.fuel,
            air_conditioning:  car.air_conditioning,
            rate: car.rate,
            transmission: car.transmission,
            startDate: car.startDate,
            endDate: car.endDate,
        })
    }
    renderCar(ownerId){
        this.carService
            .findCarByOwnerId(ownerId)
            .then(car => this.setCar(car[0]));
    }

    updateCar() {
        this.carService
            .updateCar(this.state.id, this.state.category, this.state.type, this.state.fuel, this.state.air_conditioning,
                this.state.transmission, this.state.address, this.state.startDate,
                this.state.endDate,this.state.rate)
    }

    render() {
        return (
            <div className="SubForm">
                <Form horizontal>
                    <FormGroup className="form-inline" controlId="address" bsSize="large">
                    <ControlLabel className="col-4">Car Address</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        className="col-8"
                        value={this.state.address}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup className="form-inline" controlId="transmission" bsSize="large">
                            <ControlLabel className="col-4">Transmission</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                className="col-8"
                                value={this.state.transmission}
                                onChange={this.handleChange}
                            />
                </FormGroup>
                        <FormGroup className="form-inline" controlId="fuel" bsSize="large">
                            <ControlLabel className="col-4">Fuel</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                className="col-8"
                                value={this.state.fuel}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-inline" controlId="air_conditioning" bsSize="large">
                            <ControlLabel className="col-4">Air Conditioning</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                className="col-8"
                                value={this.state.air_conditioning}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-inline" controlId="category" bsSize="large">
                            <ControlLabel className="col-4">Category</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                className="col-8"
                                value={this.state.category}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    <FormGroup className="form-inline" controlId="type" bsSize="large">
                        <ControlLabel className="col-4">Type</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            className="col-8"
                            value={this.state.type}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="form-inline" controlId="rate" bsSize="large">
                    <ControlLabel className="col-4">Rate</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                className="col-8"
                                value={this.state.rate}
                                onChange={this.handleChange}
                    />
                    </FormGroup>
                    <FormGroup className="form-inline" controlId="startDate" bsSize="large">
                            <ControlLabel className="col-4">Start Date</ControlLabel>
                            <FormControl
                                autoFocus
                                type="date"
                                className="col-8"
                                value={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-inline" controlId="endDate" bsSize="large">
                            <ControlLabel className="col-4">End Date</ControlLabel>
                            <FormControl
                                autoFocus
                                type="date"
                                className="col-8"
                                value={this.state.endDate}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                </Form>
                <div className="buttonCss">
                <button
                    className="btn btn-primary"
                    disabled={!this.validateForm()}
                    onClick={this.updateCar}> Update your Car
                </button>
                </div>
            </div>
        );
    }
}