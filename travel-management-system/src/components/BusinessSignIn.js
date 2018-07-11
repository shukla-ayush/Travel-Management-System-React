import React, { Component } from "react";
import {Link } from 'react-router-dom';
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import OwnerServiceClient from "../services/OwnerService";


export default class BusinessSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
        this.ownerService = OwnerServiceClient.instance;
        this.loginOwner = this.loginOwner.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    loginOwner(){
        this
            .ownerService
            .loginOwner(this.state.username,this.state.password)
            .then((owner) => {owner == null ? alert ("Wrong Credentials") : window.location.assign(`/businessProfile/${owner._id}`);});
    }

    render() {
        return (
            <div>
            <div className="Form">
                <form>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                </form>
                <div className="buttonCss">
                <button
                    className="btn btn-success"
                    disabled={!this.validateForm()}
                    type="submit"
                    onClick={this.loginOwner}>
                    LogIn
                </button>
                </div>
            </div>
            <div className="buttonCss">
                <Link to="/addYourBusiness">
                    Want to Add your Business ??
                </Link>
            </div>
    </div>
        );
    }
}