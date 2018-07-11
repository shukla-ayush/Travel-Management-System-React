import React, {Component} from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import CustomerListItem from "./CustomerListItem";
import UserService from "../services/UserService";


export default class CustomerListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            customers: [],
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            dateOfBirth: String,
            phone: "",
            email: "",
            address: ""
        };


        this.customerService = UserService.instance
        this.createCustomer = this.createCustomer.bind(this)
        this.deleteCustomer = this.deleteCustomer.bind(this)
        this.populateCustomer = this.populateCustomer.bind(this)
        this.updateCustomer = this.updateCustomer.bind(this)
        this.findAllCustomers = this.findAllCustomers.bind(this)
        this.setCustomers = this.setCustomers.bind(this)
        this.setFirstName = this.setFirstName.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setLastName = this.setLastName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setPhone = this.setPhone.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setDateOfBirth = this.setDateOfBirth.bind(this)
        this.setConfirmPassword = this.setConfirmPassword.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.validateAndCreate = this.validateAndCreate.bind(this)
    }


    componentDidMount() {
        this.findAllCustomers();
    }

    componentWillReceiveProps(newProps) {
        this.findAllCustomers();
    }

    renderListOfCustomers() {
        let customers = null;
        if (this.state) {
            customers = this.state.customers.map((customer) => {
                    return <CustomerListItem key={customer.id}
                                             customer={customer}
                                             deleteCustomer={this.deleteCustomer}
                                             populateCustomer={this.populateCustomer}/>
                }
            );
        }
        return (
            customers
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

    validateAndCreate() {
        (this.state.password === this.state.confirmPassword) ?
            this.createCustomer() : window.alert("Passwords do not match")
    }

    createCustomer() {
        const customer = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            phoneNumber: this.state.phone,
        }
        this.customerService
            .createCustomer(customer)
            .then(() => {
                this.findAllCustomers();
            })
    }

    deleteCustomer(customerId) {
        var answer = window.confirm("Click Ok to delete");
        if (answer == true) {
            this.customerService
                .deleteCustomer(customerId)
                .then(() => {
                        this.findAllCustomers()
                    }
                );
        }
    }

    populateCustomer(customer) {
        this.setState({
            username: customer.username,
            password: customer.password,
            firstName: customer.firstName,
            lastName: customer.lastName,
            dateOfBirth: customer.dateOfBirth,
            address: customer.address,
            email: customer.email,
            phone: customer.phoneNumber,
            id: customer._id
        })
    }

    updateCustomer() {
        const customer = {
            _id: this.state.id,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            phoneNumber: this.state.phone
        }
        this.customerService
            .updateCustomer(customer)
            .then(() => {
                    this.findAllCustomers()
                }
            );
    }

    setCustomers(ownrs) {
        this.setState({
            customers: ownrs
        })
    }

    findAllCustomers() {
        this.customerService
            .findAllCustomers()
            .then(response => {
                this.setCustomers(response)
            })
    }

    render() {
        return (
            <Switch>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 form-control" style={{overflow: 'scroll'}}>
                            <h2 style={{textAlign: "center"}}>Customers</h2>
                            <br/>
                            <ul className="list-group">
                                {this.renderListOfCustomers()}
                            </ul>
                            <br/>
                        </div>
                        <div className="col-8 form-control">
                            <br/>
                            <h3 align="center">Add Customers</h3>
                            <br/>
                            <br/>
                            <input onChange={this.setUsername}
                                   value={this.state.username}
                                   placeholder="Add Customer username"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='password'
                                   onChange={this.setPassword}
                                   value={this.state.password}
                                   placeholder="Add Customer password"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='password'
                                   onChange={this.setConfirmPassword}
                                   value={this.state.confirmPassword}
                                   placeholder="Confirm Customer password"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setFirstName}
                                   value={this.state.firstName}
                                   placeholder="Add Customer first name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setLastName}
                                   value={this.state.lastName}
                                   placeholder="Add Customer last name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input type='date'
                                   onChange={this.setDateOfBirth}
                                   value={this.state.dateOfBirth}
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setPhone}
                                   value={this.state.phone}
                                   placeholder="Add Customer Phone"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setEmail}
                                   value={this.state.email}
                                   placeholder="Add Customer Email"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setAddress}
                                   value={this.state.address}
                                   placeholder="Add Customer Address"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <button onClick={this.validateAndCreate} className="btn btn-dark btn-block">
                                <i className="fa fa-plus"></i>
                            </button>
                            <br/>
                            <button onClick={this.updateCustomer} className="btn btn-dark btn-block">
                                <i className="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </Switch>
        )
    }
}