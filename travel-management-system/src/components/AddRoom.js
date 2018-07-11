import React, { Component } from "react";
import {Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import HotelServiceClient from "../services/HotelService";

export default class AddRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
                userId: "",
                hotelId:"",
                type:"",
                numberOfBeds: ""
                };
        this.hotelService = HotelServiceClient.instance;
        this.addRoom = this.addRoom.bind(this);
        }


    validateForm() {
        return  this.state.type.length > 0 &&
                this.state.numberOfBeds.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id] : event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };
    addRoom(){
        var room = {
                    room: this.state.type,
                    numberOfBeds: this.state.numberOfBeds,
                    };
        this.hotelService
            .createRoom(room, this.state.userId);
    }

    render() {
        return (
            <div className="Form">
                <Form horizontal onSubmit={this.handleSubmit}>
                    <h2 className = "align-content-center">Enter Room Details</h2>
                    <FormGroup controlId="type" bsSize="large">
                        <ControlLabel>Room Type</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.type}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="numberOfBeds" bsSize="large">
                        <ControlLabel>Number Of Beds</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.numberOfBeds}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        text="Add Rooms in Hotel"
                        onClick={this.addRoom}
                    />
                </Form>
            </div>
        );
    }
}