import React from 'react';
import { Link } from 'react-router-dom'

export default class RentalCarsListItem
    extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/car/${this.props.car._id}`} style={{color: "black"}}>
                        Category: {this.props.car.category}<br/>Type: {this.props.car.type}

                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.deleteCar
                            (this.props.car._id)}}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() =>
                            {this.props.populateCar
                            (this.props.car)}}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}