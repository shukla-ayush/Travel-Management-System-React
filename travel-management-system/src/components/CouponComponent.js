import React, { Component } from "react";
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import HotelServiceClient from "../services/HotelService";
import CouponService from "../services/CouponService";
import CouponListItem from "./CouponListItem";

export default class CouponComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            hotelId:"",
            code:"",
            value: "",
            id: "",
            coupons: []
        };
        this.buttonText = "Add Coupon";
        this.hotelService = HotelServiceClient.instance;
        this.findCouponByHotelId = this.findCouponByHotelId.bind(this);
        this.couponService = CouponService.instance;
        this.createCoupon = this.createCoupon.bind(this);
        this.updateCoupon = this.updateCoupon.bind(this);
        this.deleteCoupon = this.deleteCoupon.bind(this);
        this.populateCoupon = this.populateCoupon.bind(this);
        this.findCouponByHotelId(this.props.match.params.hotelId);
    }

    validateForm() {
        return  this.state.code.length > 0 &&
            this.state.value.length > 0
    }


    componentDidMount(){
        this.setState({hotelId : this.props.match.params.hotelId});
        this.findCouponByHotelId(this.props.match.params.hotelId);
        this.renderListOfCoupons();
    }

    findCouponByHotelId(hotelId){
        this.couponService
            .findCouponByHotelId(hotelId)
            .then((coupons) => {this.setState({coupons: coupons})})
    }

    renderListOfCoupons(){
        let coupons = null;
        if(this.state) {
            coupons = this.state.coupons.map((coupon) => {
                    return <CouponListItem key={coupon.id}
                                          coupon={coupon}
                                          deleteCoupon={this.deleteCoupon}
                                          populateCoupon={this.populateCoupon}/>
                }
            );
        }
        return (
            coupons
        )
    }

    createCoupon(){
        var coupon = {
            hotel: this.state.hotelId,
            code: this.state.code,
            value: this.state.value,
        };
        this.couponService
            .createCoupon(coupon)
            .then(() => {
                this.findCouponByHotelId(this.state.hotelId)
            }
            );
    }
    deleteCoupon(couponId) {
        var answer = window.confirm("Click Ok to delete");
        if(answer == true) {
            this.couponService
                .deleteCoupon(couponId)
                .then(() => {
                        this.findCouponByHotelId(this.state.hotelId)
                    }
                );
        }
    }
    populateCoupon(coupon) {
        this.setState({
            id: coupon._id,
            code: coupon.code,
            value: coupon.value
        });
        this.buttonText = "Update Coupon";
    }
    updateCoupon() {
        var coupon = {
            hotel: this.state.hotelId,
            code: this.state.code,
            value: this.state.value,
            _id: this.state.id
        };
        this.couponService
            .updateCoupon(coupon)
            .then(() => {
                    this.findCouponByHotelId(this.state.hotelId)
                }
            );

    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        return (
            <div>
                {this.renderListOfCoupons()}
            <div className="Form">
                <Form horizontal>
                    <h2 className = "align-content-center">Enter Coupon Details</h2>
                    <FormGroup controlId="code" bsSize="large">
                        <ControlLabel>Coupon Code</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.code}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="value" bsSize="large">
                        <ControlLabel>Coupon Value</ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                </Form>
                <div className="buttonCss">
                <button
                    className="btn btn-success"
                    disabled={!this.validateForm()}
                    type="submit"
                    onClick={this.buttonText === "Add Coupon"? this.createCoupon : this.updateCoupon}>
                    {this.buttonText}
                </button>
                </div>
            </div>
            </div>
        );
    }
}