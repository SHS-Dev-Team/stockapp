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
import Profile from './navpages/Profile';

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
                        <div class = "logo" id="logo">
                            <span class="colorgrad" display="inline" kind="animated">StockApp</span>
                        </div>
                        <div class="navbar" id="navbar">
                            <nav>
                                <ul>
                                    <li>
                                        <div class="homeicon icon"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/stock-chart_1f5e0.png" srcset="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/lg/57/stock-chart_1f5e0.png 2x" 
                                        alt="Stock Chart on LG G5" width="25"></img></div>
                                        <NavLink exact to="/" activeClassName="selected">Home</NavLink>
                                    </li>
                                    <li>
                                        <div class="learnicon icon"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/newspaper_1f4f0.png" srcset="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/newspaper_1f4f0.png 2x" 
                                        alt="Newspaper on Microsoft Windows 10 May 2019 Update" width="25"></img></div>
                                        <NavLink to="/learn" activeClassName="selected">Learn</NavLink>
                                    </li>
                                    <li>
                                        <div class="abouticon icon"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/classical-building_1f3db.png" srcset="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/classical-building_1f3db.png 2x" 
                                        alt="Classical Building on Microsoft Windows 10 May 2019 Update" width="25"></img></div>
                                        <NavLink to="/about" activeClassName="selected">About</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="profile" id="profile">
                            <img id="profileimage" src = "https://animalcrossingworld.com/wp-content/uploads/2020/02/177_200131_NSW_Animal-Crossing-New-Horizons_Characters-282-790x790.png"></img>
                            <span id="profilename">
                                <NavLink to='/profile' activeClassName="selectedprofile">theman_01</NavLink>
                            </span>
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
                            <Route path='/profile'>
                                <Profile name="theman_01" />
                            </Route>
                    </div>
                    <div class="children right">
                        <form>
                            <input type="text" placeholder="Enter Stock"></input>
                        </form> 
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