import React, {Component} from 'react'
import OwnerService from "../services/OwnerService";
import UserService from "../services/UserService";

const CARS_LOGO = 'https://logoobject.com/wp-content/uploads/edd/2017/09/Real-Estate-Logos-Inspiration.png';

export default class CarsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            role: '',
            info: false,
            restId: null,
            RestOwner: null,
            cars: [],
            hidden: false,
            dbCars: []
        };
        this.OwnerService = OwnerService.instance;
        this.userService = UserService.instance;
        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.findCurrentUserStatus();
        this.setCarsForProviders = this.setCarsForProviders.bind(this)
        this.contactCar = this.contactCar.bind(this);
    }

    checkUserStatus(status) {
        return status;
    }

    findCurrentUserStatus() {
        return this.userService.isUserLoggedIn()
            .then(response => {
                if (response != null) {
                    this.setState({hidden: true});
                    let user = response[0]
                    this.setState({user: user})
                }
            });
    }

    setCarsForProviders(results) {
        this.setState({
            cars: results
        })
    }

    contactCar(owners) {
        this.OwnerService.findOwnerById(owners)
            .then((owner) => {
                var ownerEmail = owner[0].email;
                window.location.assign("mailto:" + ownerEmail)
            });
    }

    render() {
        if (this.props.data2) {
            if (this.props.data) {
                return (
                    <div className="container-fluid">
                        <div className="container p-5 m-5">
                            <div className="row">
                                {this.props.data2.map((car, index) =>
                                    <div className="col-sm-12" key={car._id} style={{marginBottom: 5}}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text text-center">
                                                    <b>Category:</b> {car.category}
                                                </p>
                                                <p className="card-text">
                                                    <b>Type:</b> {car.type}
                                                </p>
                                                <p className="card-text">
                                                    <b>Address:</b> {car.address}
                                                </p>
                                                <p className="card-text">
                                                    <b>Rate:</b> {car.rate}
                                                </p>
                                                <p className="card-text">
                                                    <b>Availability:</b> {car.start_date.toString().split('T')[0]}
                                                    <b>-</b> {car.end_date.toString().split('T')[0]}
                                                </p>
                                                {this.state.hidden === false &&
                                                <span>
                                                    <div className="buttonCss">
                                            <button className="btn btn-primary" onClick={() => {
                                                window.location.assign(`/login`)
                                            }}>
                                                 Login to contact owner for Deal
                                            </button>
                                                    </div>
                                        </span>}
                                                {this.state.hidden === true &&
                                                <span>
                                                    <div className="buttonCss">
                                            <button className="btn btn-success"
                                                    onClick={() => this.contactCar(car.owners)}>
                                                Contact Owner For Deal
                                            </button>
                                                    </div>
                                        </span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="container p-5 m-5">
                            <div className="row">
                                {this.props.data.map((provider, index) =>
                                    <div className="col-sm-12" key={provider.id} style={{marginBottom: 40}}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{provider.provider.company_name}</h5>
                                                <p className="card-text text-center">
                                                    <b>Address:</b> {provider.address.line1} {provider.address.city} {provider.address.region} {provider.address.country}
                                                </p>
                                                <div className="row">
                                                    {provider.cars.map((car, index) =>
                                                        <div className="col-sm-5" key={provider.id}
                                                             style={{marginBottom: 40}}>
                                                            <div className="card">
                                                                <img className="card-img-top"
                                                                     src="https://cdn.pixabay.com/photo/2016/04/01/09/11/car-1299198_960_720.png"
                                                                     alt="Card image cap"/>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{car.vehicle_info.category}</h5>
                                                                    <div class="card-text">
                                                                        <ul>
                                                                            <li>Vehicle
                                                                                Type: {car.vehicle_info.type}</li>
                                                                            <li>Vehicle
                                                                                Air-Conditioning: {car.vehicle_info.air_conditioning}</li>
                                                                            <li>Vehicle
                                                                                Fuel: {car.vehicle_info.fuel}</li>
                                                                            <li>Amount: {car.rates[0].price.amount} {car.rates[0].price.currency}</li>
                                                                            <li><b>Estimated Total for
                                                                                Trip: {car.estimated_total.amount} {car.estimated_total.currency}</b>
                                                                            </li>
                                                                            <br/>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="container-fluid">
                        <div className="container p-5 m-5">
                            <div className="row">
                                {this.props.data2.map((car, index) =>
                                    <div className="col-sm-12" key={car._id} style={{marginBottom: 5}}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text text-center">
                                                    <b>Category:</b> {car.category}
                                                </p>
                                                <p className="card-text">
                                                    <b>Type:</b> {car.type}
                                                </p>
                                                <p className="card-text">
                                                    <b>Address:</b> {car.address}
                                                </p>
                                                <p className="card-text">
                                                    <b>Rate:</b> {car.rate}
                                                </p>
                                                <p className="card-text">
                                                    <b>Availability:</b> {car.start_date} <b>-</b> {car.end_date}
                                                </p>
                                                {this.state.hidden === false &&
                                                <span>
                                                    <div className="buttonCss">
                                            <button className="btn btn-primary" onClick={() => {
                                                window.location.assign(`/login`)
                                            }}>
                                                 Login to contact owner for Deal
                                            </button>
                                                    </div>
                                        </span>}
                                                {this.state.hidden === true &&
                                                <span>
                                                    <div className="buttonCss">
                                            <button className="btn btn-success"
                                                    onClick={() => this.contactCar(car.owners)}>
                                                Contact Owner For Deal
                                            </button>
                                                    </div>
                                        </span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}