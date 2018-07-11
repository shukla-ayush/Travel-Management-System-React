import React from 'react';
import {Link} from 'react-router-dom'

export default class CustomerListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/customer/${this.props.customer._id}`} style={{color: "black"}}>
                        Username: {this.props.customer.username}
                        <br/>First Name: {this.props.customer.firstName}
                        <br/>Last Name: {this.props.customer.lastName}
                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() => {
                                this.props.deleteCustomer
                                (this.props.customer._id)
                            }}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() => {
                                this.props.populateCustomer
                                (this.props.customer)
                            }}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}