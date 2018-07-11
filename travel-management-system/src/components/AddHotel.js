import React, {Component} from "react";
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import HotelServiceClient from "../services/HotelService";
import {Link, Route, Switch} from "react-router-dom";

export default class AddHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owners: "",
            name: "",
            address: "",
            phone: "",
            rate: "",
            latitude: "",
            longitude: ""
        };
        this.hotelService = HotelServiceClient.instance;
        this.registerHotel = this.registerHotel.bind(this);
    }

    componentDidMount() {
        this.setOwners(this.props.match.params.userId);
    }

    setOwners(userId) {
        this.setState({owners: userId});
    }

    componentWillReceiveProps(newProps) {
        this.setOwners(newProps.match.params.userId);
    }

    validateForm() {
        return this.state.name.length > 0 &&
            this.state.address.length > 0 &&
            this.state.phone.length > 0 &&
            this.state.rate.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    registerHotel() {
        this.hotelService
            .createHotel(this.state.owners, this.state.name, this.state.address, this.state.phone, this.state.rate)
            .then(() => {
                window.location.assign(`/businessProfile/${this.state.owners}`);
            });

    }


    render() {
        return (
            <Switch>
                <div>
                    <div className="SubForm">
                        <Form horizontal>
                            <FormGroup className="form-inline" controlId="name" bsSize="large">
                                <ControlLabel className="col-4">Hotel Name</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="address" bsSize="large">
                                <ControlLabel className="col-4">Hotel City</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="phone" bsSize="large">
                                <ControlLabel className="col-4">Phone</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.phone}
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
                        </Form>
                        <div className="buttonCss">
                            <button className="btn btn-primary" disabled={!this.validateForm()}
                                    onClick={this.registerHotel}>
                                Add Hotel
                            </button>
                        </div>
                    </div>
                </div>
            </Switch>
        );
    }
}