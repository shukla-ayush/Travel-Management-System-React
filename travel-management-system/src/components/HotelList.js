import React, {Component} from 'react'
import CouponService from "../services/CouponService";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import OwnerService from "../services/OwnerService";

const HOTEL_LOGO = 'https://logoobject.com/wp-content/uploads/edd/2017/09/Real-Estate-Logos-Inspiration.png';

export default class HotelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            role: '',
            info: false,
            restId: null,
            RestOwner: null,
            hotels: [],
            dbHotels: [],
            coupons: [],
            hidden: false,
            disabled: ''
        }

        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.couponService = CouponService.instance
        this.userService = UserService.instance
        this.findCurrentUserStatus()
        this.findCouponByHotelId = this.findCouponByHotelId.bind(this)
        this.findAllCoupons = this.findAllCoupons.bind(this)
        this.setCoupons = this.setCoupons.bind(this)
        this.deleteCoupon = this.deleteCoupon.bind(this)
        this.OwnerService = OwnerService.instance;
        this.contactHotel = this.contactHotel.bind(this);
    }

    setCoupons(cpns) {
        this.setState({
            coupons: cpns
        })
    }

    contactHotel(owners) {
        this.OwnerService.findOwnerById(owners)
            .then((owner) => {
                var ownerEmail = owner[0].email;
                window.location.assign("mailto:" + ownerEmail)
            });
    }

    findAllCoupons() {
        this.couponService
            .findAllCoupons()
            .then(response => {
                this.setCoupons(response)
            })
    }

    deleteCoupon(couponId) {
        this.couponService
            .deleteCoupon(couponId)
            .then(() => {
                    this.findAllCoupons()
                }
            );
    }

    componentDidMount() {
        this.findAllCoupons()
    }

    componentWillReceiveProps() {
        this.findAllCoupons()
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

    checkUserStatus(status) {
        return status;
    }

    findCouponByHotelId(hotelId) {
        this.couponService
            .findCouponByHotelId(hotelId)
            .then((coupons) => {
                this.setState({coupons: coupons})
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container p-5 m-5">
                    <div className="row">
                        {this.props.data2.map((hotel, index) =>
                            <div className="col-sm-4" key={hotel._id} style={{marginBottom: 40}}>
                                <div className="card">
                                    <img className="card-img-top"
                                         src="https://picsum.photos/3744/5616?image=1065"
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{hotel.name}</h5>
                                        <p className="card-text">
                                            <b>Address:</b> {hotel.address}
                                        </p>
                                        <p className="card-text">
                                            <b>Rate:</b> {hotel.rate}
                                        </p>
                                        <p className="card-text"><b>Call:</b> {hotel.phone}</p>
                                        {this.state.hidden === false &&
                                        <span>
                                            <div className="buttonCss">
                                            <button className="btn btn-success" onClick={() => {
                                                window.location.assign(`/login`)
                                            }}>
                                            Login to view special discount coupons
                                            </button>
                                            <button className="btn btn-primary" onClick={() => {
                                                window.location.assign(`/login`)
                                            }}>
                                            Contact Owner
                                            </button>
                                            </div>
                                        </span>}
                                        {this.state.hidden === true &&
                                        <span>
                                            <div className="buttonCss">
                                            <button className="btn btn-primary"
                                                    onClick={() => this.contactHotel(hotel.owners)}>
                                                Contact Owner
                                            </button>
                                            </div>
                                        </span>}
                                        {this.state.coupons.map((coupon, index) =>
                                            <div>
                                                {coupon.hotel === hotel._id && this.state.hidden === true &&
                                                <span>
                                                    <h6>Avail Coupons</h6>
                                                        <ul>
                                                            <li>Code: <b>{coupon.code}</b></li>
                                                            <li>Value: <b>{coupon.value}</b></li>
                                                        </ul>
                                                    <button className="btn btn-success form-control"
                                                            onClick={() => this.deleteCoupon(coupon._id)}>
                                                        Avail Coupon
                                                    </button>
                                                    </span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {this.props.data.map((hotel, index) =>
                            <div className="col-sm-4" key={hotel.id} style={{marginBottom: 40}}>
                                <div className="card">
                                    <img className="card-img-top"
                                         src="https://logoobject.com/wp-content/uploads/edd/2017/09/Real-Estate-Logos-Inspiration.png"
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{hotel.property_name}</h5>
                                        <p className="card-text">
                                            <b>Address:</b> {hotel.address.line1} {hotel.address.city} {hotel.address.region} {hotel.address.postal_code} {hotel.address.country}
                                        </p>
                                        <p className="card-text">
                                            <b>Rate:</b> {hotel.min_daily_rate.amount} {hotel.min_daily_rate.currency}
                                        </p>
                                        <p className="card-text"><b>Room
                                            Available:</b> {hotel.rooms[0].room_type_info.room_type}</p>
                                        <p className="card-text"><b>Call:</b> {hotel.contacts[0].detail}</p>
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



