import React, {Component} from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import OwnerService from "../services/OwnerService";
import OwnerListItem from "./OwnerListItem";


export default class OwnersListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            owners: [],
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            dateOfBirth: String,
            businessName: "",
            typeOfBusiness: "",
            phone: "",
            email: "",
            address: ""
        };


        this.ownerService = OwnerService.instance
        this.createOwner = this.createOwner.bind(this)
        this.deleteOwner = this.deleteOwner.bind(this)
        this.populateOwner = this.populateOwner.bind(this)
        this.updateOwner = this.updateOwner.bind(this)
        this.findAllOwners = this.findAllOwners.bind(this)
        this.setOwners = this.setOwners.bind(this)
        this.setFirstName = this.setFirstName.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setLastName = this.setLastName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setPhone = this.setPhone.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setDateOfBirth = this.setDateOfBirth.bind(this)
        this.setConfirmPassword = this.setConfirmPassword.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setBusinessName = this.setBusinessName.bind(this)
        this.setTypeOfBusiness = this.setTypeOfBusiness.bind(this)
        this.validateAndCreate = this.validateAndCreate.bind(this)
    }


    componentDidMount() {
        this.findAllOwners();
    }

    componentWillReceiveProps(newProps) {
        this.findAllOwners();
    }

    renderListOfOwners() {
        let owners = null;
        if (this.state) {
            owners = this.state.owners.map((owner) => {
                    return <OwnerListItem key={owner.id}
                                          owner={owner}
                                          deleteOwner={this.deleteOwner}
                                          populateOwner={this.populateOwner}/>
                }
            );
        }
        return (
            owners
        )
    }

    setFirstName(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    setLastName(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    setConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    setPhone(event) {
        this.setState({
            phone: event.target.value
        })
    }

    setAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    setDateOfBirth(event) {
        this.setState({
            dateOfBirth: event.target.value
        })
    }

    setEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    setBusinessName(event) {
        this.setState({
            businessName: event.target.value
        })
        this.state.typeOfBusiness === 'HOTEL' ? <Link to={`/hotelEditor`}>
            Register the Hotel
        </Link> : this.state.typeOfBusiness === 'RESTAURANT' ? <Link to={`/restaurantEditor`}>
            Register the restaurant
        </Link> : <Link to={`/carEditor`}>
            Register the Car
        </Link>
    }

    setTypeOfBusiness(event) {
        this.setState({
            typeOfBusiness: event.target.value
        })
    }

    validateAndCreate() {
        (this.state.password === this.state.confirmPassword) ?
            this.createOwner() : window.alert("Passwords do not match")
    }

    createOwner() {
        const owner = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            phoneNumber: this.state.phone,
            typeOfBusiness: this.state.typeOfBusiness,
            businessName: this.state.businessName,
        }
        this.ownerService
            .createOwner(owner)
            .then(() => {
                this.findAllOwners();
            })
    }

    deleteOwner(ownerId) {
        var answer = window.confirm("Click Ok to delete");
        if (answer == true) {
            this.ownerService
                .deleteOwner(ownerId)
                .then(() => {
                        this.findAllOwners()
                    }
                );
        }
    }

    populateOwner(owner) {
        this.setState({
            username: owner.username,
            password: owner.password,
            firstName: owner.firstName,
            lastName: owner.lastName,
            dateOfBirth: owner.dateOfBirth,
            address: owner.address,
            email: owner.email,
            businessName: owner.businessName,
            phone: owner.phoneNumber,
            typeOfBusiness: owner.typeOfBusiness,
            id: owner._id
        })
    }

    updateOwner() {
        const owner = {
            _id: this.state.id,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            phoneNumber: this.state.phone,
            typeOfBusiness: this.state.typeOfBusiness,
            businessName: this.state.businessName,
        }
        this.ownerService
            .updateOwner(owner)
            .then(() => {
                    this.findAllOwners()
                }
            );
    }

    setOwners(ownrs) {
        this.setState({
            owners: ownrs
        })
    }

    findAllOwners() {
        this.ownerService
            .findAllOwners()
            .then(response => {
                this.setOwners(response)
            })
    }

    addBusiness(param) {
        switch (param) {
            case 'HOTEL':
                return <div>
                    <Link to={`/hotelEditor`}>
                        Register the Hotel
                    </Link>
                </div>;
            case 'RESTAURANT':
                return <div>
                    <Link to={`/restaurantEditor`}>
                        Register the restaurant
                    </Link>
                </div>;
            case 'CAR':
                return <div>
                    <Link to={`/carEditor`}>
                        Register the Car
                    </Link>
                </div>;
        }
    };

    render() {
        return (
            <Switch>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 form-control" style={{overflow: 'scroll'}}>
                            <h2 style={{textAlign: "center"}}>Owners</h2>
                            <br/>
                            <ul className="list-group">
                                {this.renderListOfOwners()}
                            </ul>
                            <br/>
                        </div>
                        <div className="col-8 form-control">
                            <br/>
                            <h3 align="center">Add Owners</h3>
                            <br/>
                            <br/>
                            <input onChange={this.setUsername}
                                   value={this.state.username}
                                   placeholder="Add Owner username"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='password'
                                   onChange={this.setPassword}
                                   value={this.state.password}
                                   placeholder="Add Owner password"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='password'
                                   onChange={this.setConfirmPassword}
                                   value={this.state.confirmPassword}
                                   placeholder="Confirm Owner password"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setFirstName}
                                   value={this.state.firstName}
                                   placeholder="Add Owner first name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setLastName}
                                   value={this.state.lastName}
                                   placeholder="Add Owner last name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='date'
                                   onChange={this.setDateOfBirth}
                                   value={this.state.dateOfBirth}
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setPhone}
                                   value={this.state.phone}
                                   placeholder="Add Owner Phone"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setEmail}
                                   value={this.state.email}
                                   placeholder="Add Owner Email"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setAddress}
                                   value={this.state.address}
                                   placeholder="Add Owner Address"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <select className="form-control text-center font-weight-bold"
                                    onChange={this.setTypeOfBusiness}>
                                <option value="HOTEL">Hotel</option>
                                <option value="RESTAURANT">Restaurant</option>
                                <option value="CAR">Rental Car</option>
                            </select>
                            <br/>
                            <input onChange={this.setBusinessName}
                                   value={this.state.businessName}
                                   placeholder="Add Owner Business Name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <button onClick={this.validateAndCreate} className="btn btn-dark btn-block">
                                <i className="fa fa-plus"></i>
                            </button>
                            <br/>
                            <button onClick={this.updateOwner} className="btn btn-dark btn-block">
                                <i className="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </Switch>
        )
    }
}