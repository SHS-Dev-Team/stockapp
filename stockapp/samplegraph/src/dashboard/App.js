import ReactDOM from 'react-dom';
import React from 'react';
import Stock from './navpages/Stock';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

class Results extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            found: false,
            data: [],
            err: ""
        }
        this.searchTic = this.searchTic.bind(this);
    }
    componentDidUpdate(prevProps) {
        this._isMounted = true;
        if (prevProps.search != this.props.search) {
            if(this.props.search.length===0){
                this.setState({found: false})
            }
            else{
                const link = `https://cloud.iexapis.com/stable/search/${this.props.search}?token=pk_35a122993a8b4f21b4d39c2076ed034c`;

                fetch(link)
                .then(response => {
                    if (this._isMounted && response.ok) {
                        const th = response.json();
                        return th;
                    }
                    else {
                        throw new Error("Could not fetch")
                    }
                })
                .then(data => {
                    if (data.length === 0) {
                        this.setState({ err: "Not Found", found: false })
                    }
                    else {
                        this.setState({ data: Object.values(data).slice(0, 5), found: true });
                    }
                })
                .catch(err => {
                    const message = err.message;
                    console.log(message);
                    this.setState({ err: message, found: false });
                });
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    searchTic(tic){
        this.setState({found: false});
        this.props.selected(tic);
    }
    render() {
        if(this.state.found){
            return (
                <ul className="list-group flex-column resultslist">
                    {
                        this.state.data.map(obj => {
                            const symb = obj.symbol;
                            const name = obj.securityName;
                            return (
                                <li key={symb} onClick={()=>this.searchTic(symb)} className="list-group-item align-items-start">
                                    <p className="mb-1"><b>{symb}</b></p>
                                    <small>{name}</small>
                                </li>
                            );
                        })
                    }
                </ul>
            )
        }
        else{
            return null;
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            selected: "",
            username: "Loading..",
            email: "",
            inputdisabled: false
            //"https://sandbox.iexapis.com/stable/stock/googl/chart/1m?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043?format=csv"
        }
        this.searchTicker = this.searchTicker.bind(this);
        this.selectedTicker = this.selectedTicker.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    searchTicker(e) {
        let tic = e.target.value;
        if (this.state.ticker !== tic) {
            this.setState({ ticker: tic.toUpperCase() });
        }
    }
    selectedTicker(tic) {
        this.setState({
            selected: tic,
            inputdisabled: true
        });
    }
    changeInput(){
        this.setState({
            inputdisabled: false
        });
    }
    componentDidMount() {
        fetch('api/user')
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    username: data.username,
                    email: data.email
                });
            })
    }
    render() {
        return (
            <HashRouter>
                <nav className="topnav navbar navbar-expand shadow navbar-dark bg-topnav" id="sidenavAccordion">
                    <a className="navbar-brand" href="index.html"><span className="colorgrad" display="inline" kind="animated">Imperium</span></a>
                    <button className="btn btn-icon btn-transparent-light order-1 order-lg-0 mr-lg-2" id="sidebarToggle" href="#"><i data-feather="menu"></i></button>
                    <form className="form-inline mr-auto d-none d-md-block">
                        <div className="input-group input-group-joined input-group-solid">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search Ticker" aria-label="Search" onChange={this.searchTicker} id="listinput" autoComplete="off" disabled={this.state.inputdisabled} />
                            <Results search={this.state.ticker} selected={this.selectedTicker} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <i data-feather="search"></i>
                                </div>
                            </div>
                        </div>

                    </form>
                    <ul className="navbar-nav align-items-center ml-auto">
                        {/*<li className="nav-item dropdown no-caret mr-3 d-none d-md-inline">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownDocs" href="#;" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="d-none d-md-inline font-weight-500">Documentation</div>
                                <i className="fas fa-chevron-right dropdown-arrow"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right py-0 mr-sm-n15 mr-lg-0 o-hidden animated--fade-in-up" aria-labelledby="navbarDropdownDocs">
                                <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro" target="_blank">
                                    <div className="icon-stack bg-primary-soft text-primary mr-4"><i data-feather="book"></i></div>
                                    <div>
                                        <div className="small text-gray-500">Documentation</div>
                                            Usage instructions and reference
                                        </div>
                                </a>
                                <div className="dropdown-divider m-0"></div>
                                <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/components" target="_blank">
                                    <div className="icon-stack bg-primary-soft text-primary mr-4"><i data-feather="code"></i></div>
                                    <div>
                                        <div className="small text-gray-500">Components</div>
                                            Code snippets and reference
                                        </div>
                                </a>
                                <div className="dropdown-divider m-0"></div>
                                <a className="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/changelog" target="_blank">
                                    <div className="icon-stack bg-primary-soft text-primary mr-4"><i data-feather="file-text"></i></div>
                                    <div>
                                        <div className="small text-gray-500">Changelog</div>
                                            Updates and changes
                                        </div>
                                </a>
                            </div>
                        </li> */}
                        <li className="nav-item dropdown no-caret mr-3 d-md-none">
                            <a className="btn btn-icon btn-transparent-light dropdown-toggle" id="searchDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="search"></i></a>
                            {/* Dropdown - Search*/}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--fade-in-up" aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100">
                                    <div className="input-group input-group-joined input-group-solid">
                                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <div className="input-group-text"><i data-feather="search"></i></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                            <a className="btn btn-icon btn-transparent-light dropdown-toggle" id="navbarDropdownAlerts" href="#;" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="bell"></i></a>
                            <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                                <h6 className="dropdown-header dropdown-notifications-header">
                                    <i className="mr-2" data-feather="bell"></i>
                                        Alerts Center
                                    </h6>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <div className="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i></div>
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-details">December 29, 2019</div>
                                        <div className="dropdown-notifications-item-content-text">This is an alert message. It's nothing serious, but it requires your attention.</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <div className="dropdown-notifications-item-icon bg-info"><i data-feather="bar-chart"></i></div>
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-details">December 22, 2019</div>
                                        <div className="dropdown-notifications-item-content-text">A new monthly report is ready. Click here to view!</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <div className="dropdown-notifications-item-icon bg-danger"><i className="fas fa-exclamation-triangle"></i></div>
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-details">December 8, 2019</div>
                                        <div className="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <div className="dropdown-notifications-item-icon bg-success"><i data-feather="user-plus"></i></div>
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-details">December 2, 2019</div>
                                        <div className="dropdown-notifications-item-content-text">New user request. Woody has requested access to the organization.</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-footer" href="javascript:void(0);">View All Alerts</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                            <a className="btn btn-icon btn-transparent-light dropdown-toggle" id="navbarDropdownMessages" href="#;" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="mail"></i></a>
                            <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownMessages">
                                <h6 className="dropdown-header dropdown-notifications-header">
                                    <i className="mr-2" data-feather="mail"></i>
                                        Message Center
                                    </h6>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <img className="dropdown-notifications-item-img" src="https://source.unsplash.com/vTL_qy03D1I/60x60" />
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                        <div className="dropdown-notifications-item-content-details">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-item" href="javascript:void(0);">
                                    <img className="dropdown-notifications-item-img" src="https://source.unsplash.com/4ytMf8MgJlY/60x60" />
                                    <div className="dropdown-notifications-item-content">
                                        <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                        <div className="dropdown-notifications-item-content-details">Diane Chambers · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item dropdown-notifications-footer" href="javascript:void(0);">Read All Messages</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-caret mr-2 dropdown-user">
                            <a className="btn btn-icon btn-transparent-light dropdown-toggle" id="navbarDropdownUserImage" href="#;" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid" src="https://p7.hiclipart.com/preview/282/256/961/user-profile-avatar-computer-icons-google-account.jpg" /></a>
                            <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                                <h6 className="dropdown-header d-flex align-items-center">
                                    <img className="dropdown-user-img" src="https://p7.hiclipart.com/preview/282/256/961/user-profile-avatar-computer-icons-google-account.jpg" />
                                    <div className="dropdown-user-details">
                                        <div className="dropdown-user-details-name">{this.state.username}</div>
                                        <div className="dropdown-user-details-email">{this.state.email}</div>
                                    </div>
                                </h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="javascript:void(0);">
                                    <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                                        Account
                                    </a>
                                <a className="dropdown-item" href="javascript:void(0);">
                                    <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                                        Logout
                                    </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sidenav shadow-right sidenav-dark">
                            <div className="sidenav-menu">
                                <div className="nav accordion" id="accordionSidenav">
                                    <div className="sidenav-menu-heading">Main</div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards">
                                        <div className="nav-link-icon"><i data-feather="activity"></i></div>
                                            Home
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseDashboards" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                            <a className="nav-link" href="#">
                                                Search Stock
                                                    <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                            </a>
                                            <a className="nav-link" href="javascript:void(0);">
                                                Overview
                                                    <span className="badge badge-primary-soft text-primary ml-auto">Soon</span>
                                            </a>
                                        </nav>
                                    </div>
                                    {/*
                                    <div className="sidenav-menu-heading">App Views</div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                        <div className="nav-link-icon"><i data-feather="grid"></i></div>
                                Pages
                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapsePages" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseAccount" aria-expanded="false" aria-controls="pagesCollapseAccount">
                                                Account
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="pagesCollapseAccount" data-parent="#accordionSidenavPagesMenu">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="account-profile.html">
                                                        Profile
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="account-billing.html">
                                                        Billing
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="account-security.html">
                                                        Security
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="account-notifications.html">
                                                        Notifications
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                                Authentication
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="pagesCollapseAuth" data-parent="#accordionSidenavPagesMenu">
                                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesAuth">
                                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseAuthBasic" aria-expanded="false" aria-controls="pagesCollapseAuthBasic">
                                                        Basic
                                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                    </a>
                                                    <div className="collapse" id="pagesCollapseAuthBasic" data-parent="#accordionSidenavPagesAuth">
                                                        <nav className="sidenav-menu-nested nav">
                                                            <a className="nav-link" href="auth-login-basic.html">Login</a>
                                                            <a className="nav-link" href="auth-register-basic.html">Register</a>
                                                            <a className="nav-link" href="auth-password-basic.html">Forgot Password</a>
                                                        </nav>
                                                    </div>
                                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseAuthSocial" aria-expanded="false" aria-controls="pagesCollapseAuthSocial">
                                                        Social
                                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                    </a>
                                                    <div className="collapse" id="pagesCollapseAuthSocial" data-parent="#accordionSidenavPagesAuth">
                                                        <nav className="sidenav-menu-nested nav">
                                                            <a className="nav-link" href="auth-login-social.html">Login</a>
                                                            <a className="nav-link" href="auth-register-social.html">Register</a>
                                                            <a className="nav-link" href="auth-password-social.html">Forgot Password</a>
                                                        </nav>
                                                    </div>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                                Error
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="pagesCollapseError" data-parent="#accordionSidenavPagesMenu">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="error-400.html">
                                                        400 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-401.html">
                                                        401 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-403.html">
                                                        403 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-404-1.html">
                                                        404 Error 1
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-404-2.html">
                                                        404 Error 2
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-500.html">
                                                        500 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-503.html">
                                                        503 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="error-504.html">
                                                        504 Error
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#pagesCollapseKnowledgeBase" aria-expanded="false" aria-controls="pagesCollapseKnowledgeBase">
                                                Knowledge Base
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="pagesCollapseKnowledgeBase" data-parent="#accordionSidenavPagesMenu">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="knowledge-base-home-1.html">
                                                        Home 1
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="knowledge-base-home-2.html">
                                                        Home 2
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="knowledge-base-category.html">
                                                        Category
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="knowledge-base-article.html">
                                                        Article
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                </nav>
                                            </div>
                                            <a className="nav-link" href="pricing.html">
                                                Pricing
                                        <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                            </a>
                                            <a className="nav-link" href="invoice.html">
                                                Invoice
                                        <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                            </a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseFlows" aria-expanded="false" aria-controls="collapseFlows">
                                        <div className="nav-link-icon"><i data-feather="repeat"></i></div>
                                Flows
                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseFlows" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav">
                                            <a className="nav-link" href="multi-tenant-select.html">Multi-Tenant Registration</a>
                                            <a className="nav-link" href="wizard.html">
                                                Wizard
                                        <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                            </a>
                                        </nav>
                                    </div>
                                    <div className="sidenav-menu-heading">UI Toolkit</div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="nav-link-icon"><i data-feather="layout"></i></div>
                                Layout
                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseLayouts" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseLayoutSidenavVariations" aria-expanded="false" aria-controls="collapseLayoutSidenavVariations">
                                                Sidenav Variations
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="collapseLayoutSidenavVariations" data-parent="#accordionSidenavLayout">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                                    <a className="nav-link" href="layout-dark.html">Dark Sidenav</a>
                                                    <a className="nav-link" href="layout-rtl.html">RTL Layout</a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseLayoutContainers" aria-expanded="false" aria-controls="collapseLayoutContainers">
                                                Container Options
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="collapseLayoutContainers" data-parent="#accordionSidenavLayout">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="layout-boxed.html">
                                                        Boxed Layout
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="layout-fluid.html">Fluid Layout</a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseLayoutsPageHeaders" aria-expanded="false" aria-controls="collapseLayoutsPageHeaders">
                                                Page Headers
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="collapseLayoutsPageHeaders" data-parent="#accordionSidenavLayout">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="header-simplified.html">Simplified</a>
                                                    <a className="nav-link" href="header-compact.html">
                                                        Compact
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                    <a className="nav-link" href="header-overlap.html">Content Overlap</a>
                                                    <a className="nav-link" href="header-breadcrumbs.html">Breadcrumbs</a>
                                                    <a className="nav-link" href="header-light.html">Light</a>
                                                </nav>
                                            </div>
                                            <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseLayoutsStarterTemplates" aria-expanded="false" aria-controls="collapseLayoutsStarterTemplates">
                                                Starter Layouts
                                        <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                            </a>
                                            <div className="collapse" id="collapseLayoutsStarterTemplates" data-parent="#accordionSidenavLayout">
                                                <nav className="sidenav-menu-nested nav">
                                                    <a className="nav-link" href="starter-default.html">Default</a>
                                                    <a className="nav-link" href="starter-minimal.html">
                                                        Minimal
                                                <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                                    </a>
                                                </nav>
                                            </div>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseComponents" aria-expanded="false" aria-controls="collapseComponents">
                                        <div className="nav-link-icon"><i data-feather="package"></i></div>
                                Components
                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseComponents" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav">
                                            <a className="nav-link" href="alerts.html">Alerts</a>
                                            <a className="nav-link" href="avatars.html">Avatars</a>
                                            <a className="nav-link" href="badges.html">Badges</a>
                                            <a className="nav-link" href="buttons.html">Buttons</a>
                                            <a className="nav-link" href="cards.html">
                                                Cards
                                        <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                            </a>
                                            <a className="nav-link" href="dropdowns.html">Dropdowns</a>
                                            <a className="nav-link" href="forms.html">
                                                Forms
                                        <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                            </a>
                                            <a className="nav-link" href="modals.html">Modals</a>
                                            <a className="nav-link" href="navigation.html">
                                                Navigation
                                        <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                            </a>
                                            <a className="nav-link" href="progress.html">Progress</a>
                                            <a className="nav-link" href="step.html">
                                                Step
                                        <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                            </a>
                                            <a className="nav-link" href="timeline.html">
                                                Timeline
                                        <span className="badge badge-primary-soft text-primary ml-auto">New</span>
                                            </a>
                                            <a className="nav-link" href="toasts.html">Toasts</a>
                                            <a className="nav-link" href="tooltips.html">Tooltips</a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#;" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="false" aria-controls="collapseUtilities">
                                        <div className="nav-link-icon"><i data-feather="tool"></i></div>
                                Utilities
                                <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseUtilities" data-parent="#accordionSidenav">
                                        <nav className="sidenav-menu-nested nav">
                                            <a className="nav-link" href="animations.html">Animations</a>
                                            <a className="nav-link" href="background.html">Background</a>
                                            <a className="nav-link" href="borders.html">Borders</a>
                                            <a className="nav-link" href="lift.html">Lift</a>
                                            <a className="nav-link" href="shadows.html">Shadows</a>
                                            <a className="nav-link" href="typography.html">
                                                Typography
                                        <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                            </a>
                                        </nav>
                                    </div>
                                    <div className="sidenav-menu-heading">Addons</div>
                                    <a className="nav-link" href="charts.html">
                                        <div className="nav-link-icon"><i data-feather="bar-chart"></i></div>
                                Charts
                            </a>
                                    <a className="nav-link" href="tables.html">
                                        <div className="nav-link-icon"><i data-feather="filter"></i></div>
                                Tables
                            </a> */}
                                    </div> 
                            </div>
                            <div className="sidenav-footer">
                                <div className="sidenav-footer-content">
                                    <div className="sidenav-footer-subtitle">Logged in as:</div>
                                    <div className="sidenav-footer-title">{this.state.username}</div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        <Route exact path="/">
                            <Stock changeInput={this.changeInput} tic={this.state.selected} url={`https://sandbox.iexapis.com/stable/stock/${this.state.selected}/chart/max?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv`} />
                        </Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}



export default App;



ReactDOM.render(
    <App />,
    document.getElementById('base')
);

