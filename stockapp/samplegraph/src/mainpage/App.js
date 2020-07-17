import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Select from 'react-select';
import Home from './navpages/Home';
import Learn from './navpages/Learn';

class Results extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state={
            found: false,
            data: [],
            err: ""
        }
    }
    componentDidUpdate(prevProps){
        this._isMounted=true;
        if(prevProps.search!=this.props.search){
            
            const link = `http://cloud.iexapis.com/stable/search/${this.props.search}?token=pk_35a122993a8b4f21b4d39c2076ed034c`;

            fetch(link)
            .then(response=>{
                if(this._isMounted && response.ok){
                    const th = response.json();
                    return th;
                }
                else{
                    throw new Error("Could not fetch")
                }
            })
            .then(data=>{
                data.length===0 ? this.setState({err: "Not Found", found: false}) : this.setState({data: Object.values(data), found:true});
            })
            .catch(err=>{
                const message = err.message;
                console.log(message);
                this.setState({err:message,found: false});
            });
        }
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    render(){
        return(
            <datalist id="tickresults">
                {
                    this.state.found ? 
                    this.state.data.map(obj=>{
                        const symb = obj.symbol;
                        const name = obj.securityName;
                        return(
                            <option key={symb} value={symb}>{name}</option>
                        );
                    })
                    : this.state.err 
                }
            </datalist>
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ticker: "",
            selected: "",
            username:"Loading.."
            //"https://sandbox.iexapis.com/stable/stock/googl/chart/1m?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043?format=csv"
        }
        this.searchTicker = this.searchTicker.bind(this);
        this.selectedTicker = this.selectedTicker.bind(this);
    }
    searchTicker(e){
        let tic = e.target.value;
        if(this.state.ticker!==tic){
            fetch(`https://sandbox.iexapis.com/stable/stock/${tic}/company?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043`)
            .then(res=>{
                if(res.ok){
                    this.setState({ticker: tic.toUpperCase()});
                }
            })
        }
    }
    selectedTicker(e){
        e.preventDefault();
        this.setState({selected:this.state.ticker});
    }
    componentDidMount(){
        fetch('api/user')
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            this.setState({
                username: data.username
            });
        })
    }
    render(){
        return (
            <HashRouter> 
                <div id="wrapper">
                    {/*sidebar */}
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">            

                    { /*Sidebar - Brand */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/app">
                            <div className="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-chart-line"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3"><span className ="colorgrad" display="inline" kind="animated">Imperium</span></div>
                        </a>

                        { /* Divider */ }
                        <hr className="sidebar-divider my-0"></hr>

                        { /* Nav Item - Dashboard */ }
                        <li className="nav-item active">
                            
                            <NavLink className="nav-link" exact to="/" activeClassName="selected">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                Dashboard              
                            </NavLink>
                        </li>

                        { /* Divider */ }
                        <hr className="sidebar-divider"></hr>

                        { /* Heading */ }
                        <div className="sidebar-heading">
                            Learn
                        </div>

                        { /* Nav Item - Pages Collapse Menu */ }
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-landmark"></i>
                            <span>Basics</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Categories</h6>
                                <NavLink className= "collapse-item" to="learn" activeClassName="selected">Learn</NavLink>
                                <a className="collapse-item" href="#">Articles</a>
                            </div>
                            </div>
                        </li>

                        { /* Nav Item - Utilities Collapse Menu */ }
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                            <i class="fas fa-chess-pawn"></i>
                            <span>Strategies</span>
                            </a>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <a className="collapse-item" href="#">Fundamental</a>
                                <a className="collapse-item" href="#">Technical</a>
                            </div>
                            </div>
                        </li>

                        { /* Divider */ }
                        <hr className="sidebar-divider"></hr>

                        { /* Heading */ }
                        <div className="sidebar-heading">
                            Other
                        </div>

                        { /* Nav Item - Charts */ }\
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/profile' activeClassName="selectedprofile">
                            <i class="fas fa-user"></i>
                                <span>Profile</span>
                            </NavLink>
                        </li> 
                            
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i class="fas fa-envelope"></i>
                            <span>Contact</span></a>
                        </li>

                        { /* Nav Item - Tables */ }
                        <li className="nav-item">
                            <NavLink className="nav-link"to="/about" activeClassName="selected">
                                <i class="fab fa-black-tie"></i>
                                <span>About</span>
                            </NavLink>
                        </li>

                        { /* Divider */ }
                        <hr className="sidebar-divider d-none d-md-block"></hr>

                        { /* Sidebar Toggler (Sidebar) */ }
                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>

                    </ul>
                    
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            
                            {/*topbar*/}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                {/* Sidebar Toggle (Topbar) */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>

                                {/* Topbar Search */}
                                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" onSubmit={this.selectedTicker}>
                                    <div className="input-group">
                                    <input onChange = {this.searchTicker} type="text" className="form-control bg-light border-0 small" autoComplete="off" placeholder="Search Ticker" aria-label="Search" aria-describedby="basic-addon2" list="tickresults" id="listinput"></input>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                    <Results search = {this.state.ticker} /> 
                                    </div>
                                </form>
                                <h3>{this.state.matching}</h3>
                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">

                                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    {/* Dropdown - Messages */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"></input>
                                            <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                    </li>

                                    {/* Nav Item - Alerts */}
                                    <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        {/* Counter - Alerts */}
                                        <span className="badge badge-danger badge-counter"></span>
                                    </a>
                                    {/* Dropdown - Alerts */}{/*
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">
                                        Alerts Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 12, 2019</div>
                                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                        </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 7, 2019</div>
                                            $290.29 has been deposited into your account!
                                        </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 2, 2019</div>
                                            Spending Alert: We've noticed unusually high spending for your account.
                                        </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div> */}
                                    </li>

                                    {/* Nav Item - Messages */}
                                    <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>
                                        {/* Counter - Messages */}
                                        <span className="badge badge-danger badge-counter"></span>
                                    </a>
                                    {/* Dropdown - Messages */}{/*
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                                        <h6 className="dropdown-header">
                                        Message Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""></img>
                                            <div className="status-indicator bg-success"></div>
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                                        </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""></img>
                                            <div className="status-indicator"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                            <div className="small text-gray-500">Jae Chun · 1d</div>
                                        </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""></img>
                                            <div className="status-indicator bg-warning"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                        </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""></img>
                                            <div className="status-indicator bg-success"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                        </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                    </div> */}
                                    </li>

                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* Nav Item - User Information */}
                                    <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 medium">{this.state.username}</span>
                                        <img className="img-profile rounded-circle" src="https://img.icons8.com/pastel-glyph/2x/plus.png"></img>
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="../logout">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                        </a>
                                    </div>
                                    </li>

                                </ul>

                            </nav>
                            
                            <Route exact path="/">
                                <Home tic={this.state.selected} url={`https://sandbox.iexapis.com/stable/stock/${this.state.selected}/chart/max?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv`} />
                            </Route> 
                            <Route path="/learn">
                                <Learn />
                            </Route> 
                            {/*<Route path="/learn">
                                <Learn />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path='/profile'>
                                <Profile name="theman_01" />
                            </Route>
                            <div className="children right">
                                <Search setStock={this.setStock} />
                            </div>*/}

                        </div>
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