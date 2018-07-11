import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import NavBar from "./components/NavBar";
import Main from "./containers/Main";
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="nav">
                        <NavBar/>
                    </div>
                    <div>
                        <Main/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;