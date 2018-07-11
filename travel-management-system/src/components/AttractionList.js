import React, {Component} from 'react'

export default class AttractionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }
    render() {
        return (
            <div className="container p-5 m-5">
                <div className="container p-5 m-5">
                    <div className="row">
                        {this.props.data.map((attraction, index) =>
                            <div className="col-sm-4" key={this.props.data.indexOf(attraction)}>
                                <div className="card">
                                    <img className="card-img-top" src={attraction.main_image}
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{attraction.title}</h5>
                                        <p className="card-text">Description:{attraction.details.description}</p>
                                        <p className="card-text"><a href={attraction.details.wiki_page_link}>More Info </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}