import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Form, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem} from "react-bootstrap";
import HotelServiceClient from "../services/HotelService";
import CouponComponent from "./CouponComponent";

export default class HotelManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            hotelId: "",
            name: "",
            address: "",
            phone: "",
            rate: "",
            latitude: "",
            longitude: "",
            rooms: []
        };
        this.hotelService = HotelServiceClient.instance;
        this.updateHotel = this.updateHotel.bind(this);
        this.setState({userId: this.props.match.params.userId});
        this.renderHotel(this.props.match.params.userId);
    }

    validateForm() {
        return this.state.name.length > 0 &&
            this.state.address.length > 0 &&
            this.state.phone.length > 0 &&
            this.state.rate.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    renderHotel(ownerId) {
        this.hotelService
            .findHotelByOwnerId(ownerId)
            .then(hotel => this.setHotel(hotel[0]));
    }

    setHotel(hotel) {
        this.setState({name: hotel.name});
        this.setState({userId: hotel.owners});
        this.setState({hotelId: hotel._id});
        this.setState({address: hotel.address});
        this.setState({phone: hotel.phone});
        this.setState({rate: hotel.rate});
    }

    updateHotel() {
        this.hotelService
            .updateHotel(this.state.hotelId, this.state.name, this.state.address, this.state.phone, this.state.rate)

    }

    findAllRoomsByHotelId() {
        this
            .hotelService
            .findAllRoomsByHotelId(this.state.hotelId)
            .then(rooms => {
                this.setState({rooms: rooms})
            });
    }

    renderHotelRooms() {
        let rooms = null;
        if (this.state) {
            rooms = this.state.rooms.map((room) => {
                    return <ListGroupItem>
                        <b>Room Type:</b> room.type
                        <b>Number of Beds:</b> room.numberOfBeds
                    </ListGroupItem>
                }
            );
        }
        return (
            rooms
        )
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="SubForm">
                        <Form horizontal>
                            <FormGroup className="form-inline" controlId="name" bsSize="large">
                                <ControlLabel className="col-4">Hotel Name</ControlLabel>
                                <FormControl
                                    autoFocus
                                    className="col-8"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="address" bsSize="large">
                                <ControlLabel className="col-4">Hotel Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    className="col-8"
                                    type="text"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="phone" bsSize="large">
                                <ControlLabel className="col-4">Phone</ControlLabel>
                                <FormControl
                                    autoFocus
                                    className="col-8"
                                    type="text"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="form-inline" controlId="rate" bsSize="large">
                                <ControlLabel className="col-4">Rate</ControlLabel>
                                <FormControl
                                    autoFocus
                                    className="col-8"
                                    type="text"
                                    value={this.state.rate}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                        <div className="buttonCss">
                            <button
                                className="btn btn-primary"
                                disabled={!this.validateForm()}
                                onClick={this.updateHotel}> Update your hotel
                            </button>
                        </div>
                    </div>
                    <ListGroup>
                        {this.renderHotelRooms()}
                    </ListGroup>
                    <div>
                        <div>
                            <Link to={`/profile/${this.state.userId}/hotel/${this.state.hotelId}`}>
                                <div className="buttonCss">
                                    <button className="btn btn-dark"
                                            type="submit">
                                        COUPONS
                                    </button>
                                </div>
                            </Link>
                            <Route path="/profile/:userId/hotel/:hotelId" exact component={CouponComponent}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}