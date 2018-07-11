import React, {Component} from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import RestaurantService from "../services/RestaurantService";
import RestaurantListItem from "./RestaurantListItem";
import OwnerService from "../services/OwnerService";


export default class RestaurantListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            owner: '',
            restaurants: [],
            name: '',
            address: '',
            phone: '',
            price: '',
            city: '',
            ownerName: ''
        };

        this.createRestaurant = this.createRestaurant.bind(this)
        this.userNameChanged = this.userNameChanged.bind(this)
        this.deleteRestaurant = this.deleteRestaurant.bind(this)
        this.populateRestaurant = this.populateRestaurant.bind(this)
        this.updateRestaurant = this.updateRestaurant.bind(this)
        this.findAllRestaurants = this.findAllRestaurants.bind(this)
        this.restaurantService = RestaurantService.instance
        this.ownerService = OwnerService.instance
        this.setRestaurants = this.setRestaurants.bind(this)
        this.setName = this.setName.bind(this)
        this.setAddress = this.setAddress.bind(this)
        this.setPhone = this.setPhone.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.setCity = this.setCity.bind(this)
        this.setOwner = this.setOwner.bind(this)
    }


    componentDidMount() {
        this.findAllRestaurants();
    }

    componentWillReceiveProps(newProps){
        this.findAllRestaurants();
    }

    renderListOfRestaurants(){
        let restaurants = null;
        if(this.state) {
             restaurants = this.state.restaurants.map((restaurant) => {
                    return <RestaurantListItem key={restaurant.id}
                                          restaurant={restaurant}
                                          deleteRestaurant={this.deleteRestaurant}
                                          populateRestaurant={this.populateRestaurant}/>
                }
            );
        }
        return (
            restaurants
        )
    }

    setName(event){
        this.setState({
            name: event.target.value
        })
    }

    setPhone(event){
        this.setState({
            phone: event.target.value
        })
    }

    setAddress(event){
        this.setState({
            address: event.target.value
        })
    }

    setPrice(event){
        this.setState({
            price: event.target.value
        })
    }

    userNameChanged(event){
        this.setState({
            ownerName: event.target.value
        })
    }

    setOwner(){
        this.ownerService
            .findOwnerByUsername(this.state.ownerName)
            .then((owner1) => {(owner1.length === 0) ? window.alert("Username incorrect") : this.setState({owner: owner1[0]})});
    }

    setCity(event){
        this.setState({
            city: event.target.value
        })
    }

    createRestaurant() {
        this.restaurantService
            .createRestaurant( this.state.owner._id, this.state.name,
                this.state.address, this.state.city, this.state.phone, this.state.price)
            .then(() => { this.findAllRestaurants(); });
    }

    deleteRestaurant(restaurantId) {
        var answer = window.confirm("Click Ok to delete");
        if(answer == true) {
            this.restaurantService
                .deleteRestaurant(restaurantId)
                .then(() => {
                        this.findAllRestaurants()
                    }
                );
        }
    }

    populateRestaurant(restaurant) {
        this.setState({
            id: restaurant._id,
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
            phone: restaurant.phone,
            price: restaurant.price,
        })
    }

    updateRestaurant() {
        this.restaurantService
            .updateRestaurant( this.state.id, this.state.name, this.state.address,this.state.city, this.state.phone, this.state.price)
            .then(() => {
                    this.findAllRestaurants()
                }
            );
    }

    setRestaurants(rsts){
        this.setState({
            restaurants: rsts
        })
    }

    findAllRestaurants(){
        this.restaurantService
            .findAllRestaurants()
            .then(response => {this.setRestaurants(response)})
    }

    render() {
        return (
            <Switch>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4" style={{overflow: 'scroll'}}>
                            <h2 style={{textAlign: "center"}}>Restaurants</h2>
                            <br/>
                            <ul className="list-group">
                                {this.renderListOfRestaurants()}
                            </ul>
                            <br/>
                        </div>
                        <div className="col-sm-8" style={{overflow: 'scroll'}}>
                            <br/>
                            <br/>
                            <h3 style={{textAlign: 'center'}}>Add Restaurants</h3>
                            <br/>
                            <label>Please fill the username of restaurant owner first first</label>
                            <input onChange={this.userNameChanged}
                                   value={this.state.ownerName}
                                   placeholder="Enter Owner's username"
                                   className="form-control text-center font-weight-bold"/>
                            <button onClick={this.setOwner}
                                    className="btn btn-block btn-primary">
                                Click to verify username
                            </button>
                            <br/>
                            <input onChange={this.setName}
                                   value={this.state.name}
                                   placeholder="Add Restaurant Name"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setAddress}
                                   value={this.state.address}
                                   placeholder="Add Restaurant Address"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setCity}
                                   value={this.state.city}
                                   placeholder="Add Restaurant City"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setPhone}
                                   value={this.state.phone}
                                   placeholder="Add Restaurant Contact"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <input onChange={this.setPrice}
                                   value={this.state.price}
                                   placeholder="Add Restaurant Rate"
                                   className="form-control text-center font-weight-bold"/>
                            <br/>
                            <button onClick={this.createRestaurant} className="btn btn-dark btn-block">
                                <i className="fa fa-plus"></i>
                            </button>
                            <br/>
                            <button onClick={this.updateRestaurant} className="btn btn-dark btn-block">
                                <i className="fa fa-refresh"></i>
                            </button>
                            <br/>
                        </div>
                    </div>
                </div>
            </Switch>
        )
    }
}