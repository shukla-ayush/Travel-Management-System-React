import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import OwnerServiceClient from "../services/OwnerService";


export default class AddYourBusiness extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            businessName: "",
            phone: "",
            email: "",
            address: "",
            typeOfBusiness: "",
            confirmPassword: ""
        };
        this.registerOwner = this.registerOwner.bind(this);
        this.ownerService = OwnerServiceClient.instance;
    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.username.length > 0 &&
            this.state.firstName.length > 0 &&
            this.state.lastName.length > 0 &&
            this.state.businessName.length > 0 &&
            this.state.phone.length > 0 &&
            this.state.address.length > 0 &&
            this.state.password === this.state.confirmPassword;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    registerOwner() {
        var owner = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            businessName: this.state.businessName,
            dateOfBirth: this.state.dateOfBirth,
            phoneNumber: this.state.phone,
            address: this.state.address,
            typeOfBusiness: this.state.typeOfBusiness
        };
        this.ownerService
            .createOwner(owner)
            .then((owner) => {
                owner.Status === "Username Taken" ? alert(owner.Status) :
                    window.location.assign(`/register/${owner._id}/${this.state.typeOfBusiness.toLowerCase()}`);
            });
    }

    render() {
        return (<Router>
                <div className="row">
                    <div className="col-4 Form">
                        <Form horizontal>
                            <FormGroup className="form-inline" controlId="firstName" bsSize="large">
                                <ControlLabel className="col-4">First Name</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="lastName" bsSize="large">
                                <ControlLabel className="col-4">Last Name</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="dateOfBirth" bsSize="large">
                                <ControlLabel className="col-4">Date of Birth</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="date"
                                    className="col-8"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="email" bsSize="large">
                                <ControlLabel className="col-4">Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    className="col-8"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="businessName" bsSize="large">
                                <ControlLabel className="col-4">Business Name</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.businessName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="typeOfBusiness">
                                <ControlLabel className="col-4">Business Type</ControlLabel>
                                <FormControl componentClass="select"
                                             placeholder="Business Type"
                                             className="col-8"
                                             onChange={this.handleChange}>
                                    <option value="HOTEL">HOTEL</option>
                                    <option value="RESTAURANT">RESTAURANT</option>
                                    <option value="CAR">CAR</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="phone" bsSize="large">
                                <ControlLabel className="col-4">Phone Number</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.phone}
                                    className="col-8"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="address" bsSize="large">
                                <ControlLabel className="col-4">Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    className="col-8"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="username" bsSize="large">
                                <ControlLabel className="col-4">Username</ControlLabel>
                                <FormControl
                                    value={this.state.username}
                                    className="col-8"
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="password" bsSize="large">
                                <ControlLabel className="col-4">Password</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    className="col-8"
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="confirmPassword" bsSize="large">
                                <ControlLabel className="col-4">Confirm Password</ControlLabel>
                                <FormControl
                                    value={this.state.confirmPassword}
                                    className="col-8"
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                        </Form>
                        <div className="buttonCss">
                            <button className="btn btn-primary" disabled={!this.validateForm()}
                                    onClick={this.registerOwner}>
                                Sign Up
                            </button>
                        </div>


                    </div>
                    <div className="col-8 SubForm">
                    </div>
                </div>
            </Router>
        );
    }
}