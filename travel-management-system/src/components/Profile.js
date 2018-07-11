import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import OwnerServiceClient from '../services/OwnerService';
import "./Profile.css";
import HotelManager from "./HotelManager";
import CarManager from "./CarManager";
import RestaurantManager from "./RestaurantManager";

export default class Profile extends Component {
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
            typeOfBusiness: "",
            phone: "",
            email: "",
            address: "",
            buttonDisplay: true
        };
        this.ownerService = OwnerServiceClient.instance;
        this.setButtonDisplay = this.setButtonDisplay.bind(this);
        this.setState({userId: this.props.match.params.ownerId});
        this.renderProfile(this.props.match.params.ownerId);
        this.addBusiness = this.addBusiness.bind(this);
        this.updateOwner = this.updateOwner.bind(this);
        this.deleteOwner = this.deleteOwner.bind(this);
    }

    renderProfile(userId) {
        this.ownerService
            .findOwnerById(userId)
            .then(user => this.setProfile(user[0]));
    }

    setProfile(user) {
        this.setState({userId: user._id});
        this.setState({username: user.username});
        this.setState({password: user.password});
        this.setState({firstName: user.firstName});
        this.setState({lastName: user.lastName});
        this.setState({businessName: user.businessName});
        this.setState({typeOfBusiness: user.typeOfBusiness});
        this.setState({dateOfBirth: user.dateOfBirth});
        this.setState({phone: user.phoneNumber});
        this.setState({address: user.address});
        this.setState({email: user.email});
    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.username.length > 0 &&
            this.state.firstName.length > 0 &&
            this.state.lastName.length > 0 &&
            this.state.businessName.length > 0 &&
            this.state.dateOfBirth.length > 0 &&
            this.state.phone.length > 0 &&
            this.state.address.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    updateOwner() {
        let owner = {
            _id: this.state.userId,
            username: this.state.username,
            password: this.state.password,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.phone,
            businessName: this.state.businessName,
        };
        this.ownerService
            .updateOwner(owner);
    }

    deleteOwner() {
        this.ownerService
            .deleteOwner(this.state.userId);
        this.ownerService
            .logout()
            .then(() => window.location.assign(`/`));

    }

    setButtonDisplay() {
        this.setState({buttonDisplay: !this.state.buttonDisplay})
    }

    addBusiness(param, userId) {
        if (this.state.buttonDisplay) {
            switch (param) {
                case 'HOTEL':
                    return <div>
                        <Link to={`/profile/${userId}/hotel`}>
                            <div className="buttonCss">
                                <button className="btn btn-secondary" onClick={this.setButtonDisplay}
                                        type="submit">
                                    View Hotel Details
                                </button>
                            </div>
                        </Link>
                    </div>;
                case 'RESTAURANT':
                    return <div>
                        <Link to={`/profile/${userId}/restaurant`}>
                            <div className="buttonCss">
                                <button
                                    className="btn btn-secondary"
                                    type="submit"
                                    onClick={this.setButtonDisplay}>
                                    View Restaurant Details
                                </button>
                            </div>
                        </Link>
                    </div>;
                case 'CAR':
                    return <div>
                        <Link to={`/profile/${userId}/car`}>
                            <div className="buttonCss">
                                <button
                                    className="btn btn-secondary"
                                    type="submit"
                                    onClick={this.setButtonDisplay}>
                                    View Car Details
                                </button>
                            </div>
                        </Link>
                    </div>;
            }
        }
    };

    render() {
        return (
            <Router>
                <div className="row">
                    <div className="col-4 Form">
                        <Form horizontal>
                            <FormGroup className="form-inline" controlId="firstName" bsSize="large">
                                <ControlLabel className="col-4">First Name </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="test"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="lastName" bsSize="large">
                                <ControlLabel className="col-4">Last Name </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="dateOfBirth" bsSize="large">
                                <ControlLabel className="col-4">Date of Birth </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="date"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="email" bsSize="large">
                                <ControlLabel className="col-4">Email </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="businessName" bsSize="large">
                                <ControlLabel className="col-4 ">Business Name </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="text"
                                    value={this.state.businessName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline"
                                       controlId="typeOfBusiness"
                                       bsSize="large">
                                <ControlLabel className="col-4">Business Type</ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="text"
                                    value={this.state.typeOfBusiness}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="phone" bsSize="large">
                                <ControlLabel className="col-4">Phone Number </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="text"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="address" bsSize="large">
                                <ControlLabel className="col-4">Address </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    autoFocus
                                    type="text"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="username" bsSize="large">
                                <ControlLabel className="col-4">Username </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="password" bsSize="large">
                                <ControlLabel className="col-4">Password </ControlLabel>
                                <FormControl
                                    className="col-8"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                        </Form>
                        <div className="buttonCss">
                            <button className="btn btn-primary" onClick={this.updateOwner}>Update</button>
                            <button className="btn btn-danger" onClick={this.deleteOwner}>Delete</button>
                        </div>
                    </div>
                    <div className="col-8 SubForm">
                        {this.addBusiness(this.state.typeOfBusiness, this.state.userId)}
                        <Route path="/profile/:userId/hotel" exact component={HotelManager}/>
                        <Route path="/profile/:userId/restaurant" exact component={RestaurantManager}/>
                        <Route path="/profile/:userId/car" exact component={CarManager}/>
                    </div>
                </div>
            </Router>
        );
    }
}