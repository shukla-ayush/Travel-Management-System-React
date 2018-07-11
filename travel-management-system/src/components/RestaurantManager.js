import React, { Component } from "react";
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import RestaurantService from "../services/RestaurantService";


export default class RestaurantManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            restaurantId: "",
            name: "",
            address: "",
            city: "",
            phone: "",
            price: ""
        };
        this.restaurantService = RestaurantService.instance;
        this.updateRestaurant = this.updateRestaurant.bind(this);
        this.setState({userId : this.props.match.params.userId});
        this.renderRestaurant(this.props.match.params.userId);
    }

    validateForm() {
        return this.state.address.length > 0 &&
            this.state.name.length > 0 &&
            this.state.city.length> 0 &&
            this.state.price.length > 0

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    setRestaurant(restaurant) {
        this.setState({
            id: restaurant._id,
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
            phone: restaurant.phone,
            price: restaurant.price,
        })
    }
    renderRestaurant(ownerId){
        this.restaurantService
            .findRestaurantByOwnerId(ownerId)
            .then(restaurant => this.setRestaurant(restaurant[0]));
    }
    updateRestaurant() {
        this.restaurantService
            .updateRestaurant( this.state.id, this.state.name, this.state.address,this.state.city, this.state.phone, this.state.price)
    }
    render() {
        return (
            <div className="SubForm">
                <Form horizontal>
                    <FormGroup className="form-inline" controlId="name" bsSize="large">
                        <ControlLabel className="col-4">Restaurant Name</ControlLabel>
                        <FormControl
                            autoFocus
                            className="col-8"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                        <FormGroup className="form-inline" controlId="address" bsSize="large">
                            <ControlLabel className="col-4">Address</ControlLabel>
                            <FormControl
                                autoFocus
                                className="col-8"
                                type="text"
                                value={this.state.address}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-inline" controlId="city" bsSize="large">
                            <ControlLabel className="col-4">City</ControlLabel>
                            <FormControl
                                autoFocus
                                className="col-8"
                                type="text"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-inline" controlId="price" bsSize="large">
                            <ControlLabel className="col-4">Price</ControlLabel>
                            <FormControl
                                autoFocus
                                className="col-8"
                                type="text"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                </Form>
                <div className="buttonCss">
                <button
                    className="btn btn-primary"
                    disabled={!this.validateForm()}
                    onClick={this.updateRestaurant}>
                    Update Restaurant
                </button>
                </div>
            </div>
        );
    }
}