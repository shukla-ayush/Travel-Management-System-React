import React from 'react';
import { Link } from 'react-router-dom'

export default class RestaurantListItem
    extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/restaurant/${this.props.restaurant._id}`} style={{color: "black"}}>
                        {this.props.restaurant.name}
                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.deleteRestaurant
                            (this.props.restaurant._id)}}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.populateRestaurant
                            (this.props.restaurant)}}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}