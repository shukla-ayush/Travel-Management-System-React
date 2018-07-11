import React, {Component} from 'react'
import axios from 'axios';
import AttractionList from "./AttractionList";

var attractionUrl = 'http://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text';
var apiKey = ''

export default class AttractionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attraction: {
                name: '',
                city: '',
                category: '',
            },
            attractions: []
        };
        this.searchAttraction = this.searchAttraction.bind(this);
    }

    searchAttraction() {
        var textValue = this.refs.searchValue.value;
        axios.get(attractionUrl, {
            params: {
                city_name: textValue,
                apikey: apiKey
            }
        }).then(res => {
            const attractions = res.data.points_of_interest;
            this.setState({attractions});
        })
    }

    render() {
        return (
            <div>
                <div className="search">
                    <form>
                        <div className="form-row align-content-center search">
                            <div className="form-inline row">
                                <input className="form-control space-right" type="text"
                                       placeholder="Enter City "
                                       aria-label="Search" ref="searchValue"/>
                                <button className="fa fa-search btn btn-secondary " aria-hidden="true"
                                        type="button"
                                        onClick={this.searchAttraction}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <AttractionList data={this.state.attractions}/>
                </div>
            </div>
        )
    }
}