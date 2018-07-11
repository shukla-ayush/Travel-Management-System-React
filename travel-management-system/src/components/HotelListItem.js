import React from 'react';
import { Link } from 'react-router-dom'

export default class HotelListItem
    extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/hotel/${this.props.hotel._id}`} style={{color: "black"}}>
                        {this.props.hotel.name}
                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.deleteHotels
                            (this.props.hotel._id)}}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.populateHotel
                            (this.props.hotel)}}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}