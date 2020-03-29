import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from './navpages/Home';
import About from './navpages/About';
import Learn from './navpages/Learn';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <HashRouter>
                <div id="maincontainer">
                    <div class = "children left">
                        <div class = "logo" id="logo"></div>
                        <div class="navbar" id="navbar">
                            <nav>
                                <ul>
                                    <li>
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/learn">Learn</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about">About</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="profile" id="profile">
                            <img id="profileimage" src = "https://animalcrossingworld.com/wp-content/uploads/2020/02/177_200131_NSW_Animal-Crossing-New-Horizons_Characters-282-790x790.png"></img>
                            <span id="profilename">theman_01</span>
                        </div>
                    </div>
                    <div id="appframe" class="children middle">
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/learn">
                                <Learn />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                    </div>
                    <div class="children right">
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('base')
);