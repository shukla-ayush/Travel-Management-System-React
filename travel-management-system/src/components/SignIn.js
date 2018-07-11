import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import UserServiceClient from "../services/UserService";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
        this.userService = UserServiceClient.instance;
        this.loginCustomer = this.loginCustomer.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    loginCustomer() {
        this.userService
            .loginUser(this.state.username, this.state.password)
            .then((customer) => {
                customer == null ? alert("Wrong Credentials") : window.location.assign(`/profile/${customer._id}`);
            });
    }

    render() {
        return (
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
                    <button className="btn btn-success" disabled={!this.validateForm()}  onClick={this.loginCustomer}>Login</button>
                </div>
            </div>
        );
    }
}