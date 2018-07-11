import React from 'react';
import {Link} from 'react-router-dom'

export default class OwnerListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className="container-fluid list-group-item font-weight-bold"
                style={{backgroundColor: "white"}}>
                <div>
                    <Link to={`/owner/${this.props.owner._id}`} style={{color: "black"}}>
                        Username: {this.props.owner.username}
                        <br/>Type of Business: {this.props.owner.typeOfBusiness}
                    </Link>
                    <button className="btn btn-dark float-right"
                            onClick={() => {
                                this.props.deleteOwner
                                (this.props.owner._id)
                            }}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-dark float-right"
                            onClick={() => {
                                this.props.populateOwner
                                (this.props.owner)
                            }}>
                        <i className="fa fa-pencil"/>
                    </button>
                </div>
            </li>
        );
    }
}