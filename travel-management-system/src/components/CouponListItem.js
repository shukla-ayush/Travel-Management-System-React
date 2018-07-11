import React from 'react';
import { Link } from 'react-router-dom'

export default class CouponListItem
    extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/`} style={{color: "black"}}>
                        Code: {this.props.coupon.code}
                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.deleteCoupon
                            (this.props.coupon._id)}}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.populateCoupon
                            (this.props.coupon)}}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}