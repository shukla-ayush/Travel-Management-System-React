import React, {Component} from 'react'
import {Route, Switch } from 'react-router-dom'
import HotelPage from "../components/HotelPage";
import RestaurantPage from "../components/RestaurantPage";
import AttractionPage from "../components/AttractionPage";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import AddYourBusiness from "../components/AddYourBusiness";
import Profile from "../components/Profile";
import RentalCarsPage from "../components/RentalCarsPage";
import AdminPage from "../components/AdminPage";
import HotelListAdmin from "../components/HotelListAdmin";
import UserProfile from "../components/UserProfile";
import BusinessSignIn from "../components/BusinessSignIn"
import RestaurantListAdmin from "../components/RestaurantListAdmin";
import AddHotel from "../components/AddHotel";
import AddRestaurant from "../components/AddRestaurant";
import AddCar from "../components/AddCar";
import RentalCarsListAdmin from "../components/RentalCarsListAdmin";
import OwnersListAdmin from "../components/OwnersListAdmin";
import CustomerListAdmin from "../components/CustomerListAdmin";
import CouponListAdmin from "../components/CouponListAdmin";

export default class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={HotelPage}/>
                    <Route exact path='/hotels' component={HotelPage}/>
                    <Route exact path='/cars' component={RentalCarsPage}/>
                    <Route exact path='/restaurants' component={RestaurantPage}/>
                    <Route exact path='/attractions' component={AttractionPage}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route path="/login" component={SignIn} />
                    <Route path="/businessSignIn" exact component={BusinessSignIn} />
                    <Route path="/addYourBusiness" exact component={AddYourBusiness} />
                    <Route path="/register/:userId/hotel" exact component={AddHotel} />
                    <Route path="/register/:userId/restaurant" exact component={AddRestaurant} />
                    <Route path="/register/:userId/car" exact component={AddCar} />
                    <Route path="/businessProfile/:ownerId" exact component={Profile} />
                    <Route path="/profile/:userId" exact component={UserProfile} />
                    <Route path="/admin" exact component={AdminPage} />
                    <Route path="/hotelEditor" exact component={HotelListAdmin} />
                    <Route path="/restaurantEditor" exact component={RestaurantListAdmin} />
                    <Route path="/carEditor" exact component={RentalCarsListAdmin} />
                    <Route path="/ownerEditor" exact component={OwnersListAdmin} />
                    <Route path="/customerEditor" exact component={CustomerListAdmin} />
                    <Route path="/couponEditor" exact component={CouponListAdmin} />
                </Switch>
            </main>
        )
    }
}