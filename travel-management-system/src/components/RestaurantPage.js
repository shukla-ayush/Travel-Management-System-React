import React, {Component} from 'react'
import axios from 'axios';
import RestaurantList from "./RestaurantList";
import RestaurantService from "../services/RestaurantService";

var restaurantUrl = 'http://opentable.herokuapp.com/api/restaurants';

export default class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: {
                name: '',
                city: '',
                zip: '',
                country: ''
            },
            restaurants: [],
            dbRestaurants: [],
            selectedOption: 'name'
        };
        this.setOption = this.setOption.bind(this);
        this.searchRestaurant = this.searchRestaurant.bind(this);
        this.RestaurantService = RestaurantService.instance;
    }

    setOption(changedOption) {
        this.setState({selectedOption: changedOption.target.value});
    }

    searchRestaurant() {
        let textValue = this.refs.searchValue.value;
        let currentState = this.state.selectedOption;
        if (currentState === 'name') {
            axios.get(restaurantUrl, {
                params: {
                    name: textValue
                }
            }).then(res => {
                const restaurants = res.data.restaurants;
                this.setState({restaurants});
            });
            this.RestaurantService
                .findDbRestaurantByName(textValue)
                .then((result) => {
                    this.setState({
                        dbRestaurants: result
                    })
                });
        }
        else if (currentState === 'city') {
            axios.get(restaurantUrl, {
                params: {
                    city: textValue
                }
            }).then(res => {
                const restaurants = res.data.restaurants;
                this.setState({restaurants});
            });
            this.RestaurantService
                .findDbRestaurantByCity(textValue)
                .then((result) => {
                    this.setState({
                        dbRestaurants: result
                    })
                });
        }
        else if (currentState === 'zipcode') {
            axios.get(restaurantUrl, {
                params: {
                    zip: textValue
                }
            }).then(res => {
                const restaurants = res.data.restaurants;
                this.setState({restaurants});
            })
        }
        else if (currentState === 'country') {
            axios.get(restaurantUrl, {
                params: {
                    country: textValue
                }
            }).then(res => {
                const restaurants = res.data.restaurants;
                this.setState({restaurants});
            })
        }
    }

    render() {
        return (
            <div>
                <div className="search align-content-center">
                    <form>
                        <div className="form-row align-content-center search">
                            <div className="form-inline row">
                                <input className="form-control space-right"
                                       type="text"
                                       placeholder="Search Restaurants"
                                       aria-label="Search"
                                       ref="searchValue"/>
                                <button className="fa fa-search btn space-right" aria-hidden="true"
                                        type="button"
                                        onClick={this.searchRestaurant}>
                                    Search
                                </button>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input space-right"
                                           type="radio" name="inlineRadioOptions"
                                           id="inlineRadio1" value="name"
                                           checked={this.state.selectedOption === 'name'}
                                           onChange={this.setOption}/>
                                    <label className="input-group-text"
                                           htmlFor="inlineRadio1">Name</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input space-right"
                                           type="radio" name="inlineRadioOptions"
                                           id="inlineRadio1" value="city"
                                           checked={this.state.selectedOption === 'city'}
                                           onChange={this.setOption}/>
                                    <label className="input-group-text"
                                           htmlFor="inlineRadio1">City</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <RestaurantList data={this.state.restaurants} data2={this.state.dbRestaurants}/>
                </div>
            </div>
        )
    }
}