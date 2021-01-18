import React from 'react'
import ChartComponent from '../../chart/ChartApp'
import { TrendingUp, TrendingDown } from 'react-feather'

function formatPrice(price) {
    const total = price.toString();
    const len = total.indexOf('.');
    if (len === -1) {
        return '$' + total + '.00'
    }
    const dollar = total.substring(0, len).split('').reverse().join('');
    var newdollar = '';
    for (const num in dollar) {
        if (num != 0 && num % 3 === 0) {
            newdollar = ',' + newdollar;
        }
        newdollar = dollar[num] + newdollar;
    }
    var cent = total.substring(len + 1, len + 3);
    if (cent.length === 1) {
        cent += "0";
    }
    return '$' + newdollar + '.' + cent;
}

function NewsData(props) {
    return (
        <ul className="list-group list-group-flush">
            {
                props.newsData.slice(0, 5).map(obj => {
                    return (
                        <li className="list-group-item" key={obj.url}>
                            {/* <a style={{color:"#1a0dab"}} href={obj.url}><span className="newslink">{obj.headline}</span></a> */}
                            <a style={{ color: "#1a0dab" }} href={obj.url}><span className="h5 mb-0 font-weight-normal text-gray-800 text-sm">{obj.headline}</span></a>
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">{obj.source}</div>
                        </li>
                    );
                })
            }
        </ul>
    );
}
function TrendLine(props) {
    if (props.pos) {
        return (
            <TrendingUp size={20} />
        )
    }
    else {
        return (
            <TrendingDown size={20} />
        )
    }
}
class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            error: false,
            newsData: []
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        {/* Fetch ticker stats */ }
        const link = `https://cloud.iexapis.com/stable/stock/${this.props.tic}/batch?types=quote,news&token=pk_35a122993a8b4f21b4d39c2076ed034c`

        fetch(link)
            .then(response => {
                if (response.ok) {
                    const th = response.json();
                    return th;
                }
                else {
                    throw new Error("Could not fetch")
                }
            })
            .then(data => {
                console.log("loaded");
                const info = data.quote;
                const news = data.news;
                this.setState({
                    newsData: []
                });
                this.setState({
                    headerData: {
                        tic: this.props.tic,
                        companyName: info.companyName,
                        latestPrice: info.latestPrice,
                        changePercent: info.changePercent,
                        change: info.change
                    },
                    yrhigh: info.week52High,
                    yrlow: info.week52Low,
                    peratio: info.peRatio
                });
                for (var newsVar of news) {
                    this.setState(state => {
                        state.newsData.push(newsVar);
                    });
                }

            })
            .catch(err => {
                const message = err.message;
                console.log(message);
                this.setState({ err: message, found: false });
            });
        {/* Fetch company about info */ }
        const second = `https://cloud.iexapis.com/stable/stock/${this.props.tic}/company?token=pk_35a122993a8b4f21b4d39c2076ed034c`

        fetch(second)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    companyInfo: {
                        about: data.description,
                        industry: data.industry,
                        location: data.city + ", " + data.state || data.country,
                        ceo: data.CEO
                    }
                })
            });

        {/* Fetch sharpe ratio from backend */ }

        fetch(`api/stats?tic=${this.props.tic}`, {
            method: "GET"
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    sharpe: data.sharpe,
                    std: data.std,
                    ready: true
                })
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tic !== this.props.tic) {
            this.fetchData();
        }
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { error: true };
    }

    render() {
        const style = {
            position: "absolute",
            marginLeft: "20%",
            top: "100px",
            fontSize: "3em"
        };
        if (this.props.tic.length === 0 || !this.state.ready) {
            return (
                <div>
                    <i className="icon-spinner icon-spin icon-medium"></i><h1 className="h3 mb-0 text-gray-800" style={style}><span className="colorgrad" display="inline" kind="animated">Select a stock from above</span></h1>
                </div>
            );
        }
        else {
            const positive = this.state.headerData.changePercent > 0;
            const changeColor = positive ? "text-success" : "text-danger";
            const priceBorderColor = positive ? "border-success" : "border-danger";
            return (
                <main className="bg-gradient-primary-to-secondary">
                    <header class="page-header page-header-dark pb-10">
                        <div class="container">
                            <div class="page-header-content pt-4">
                                <div class="row align-items-center justify-content-start">
                                    <div class="col-sm-6 mt-3">
                                        <h1 class="page-header-title">
                                            <div class="page-header-icon"><i data-feather="layout"></i></div>
                                            {this.state.headerData.tic}
                                        </h1>
                                        <div class="page-header-subtitle">{this.state.headerData.companyName}</div>
                                    </div>
                                    <div class="col-sm-6 mt-3">
                                        <h1 class="page-header-title">
                                            {formatPrice(this.state.headerData.latestPrice)}
                                        </h1>
                                        <div class="page-header-subtitle">
                                            <div className={`text-xs font-weight-bold d-inline-flex align-items-center ${changeColor}`}>
                                                <i className="mr-1">
                                                    <TrendLine pos={positive} />
                                                </i>
                                                {formatPrice(this.state.headerData.change)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Main page content*/}
                    <div className="container mt-n10">

                        <div className="row">
                            <div className="col-lg-8 mb-10">
                                {/* Area chart example*/}



                                <ChartComponent height={240} url={this.props.url} color={positive} changeInput={this.props.changeInput} />



                                <div className="row mt-4">
                                    <div className="col-lg-12">
                                        {/* Bar chart example*/}
                                        <div className="card h-100">
                                            <div className="card-header">Stats</div>
                                            <div className="card-body d-flex flex-column justify-content-center">
                                                <div class="row list-group list-group-flush">
                                                    <div className="list-group-item">
                                                        <div className="row justify-content-between">
                                                            <div className="col-md">
                                                                <div className="row justify-content-between">
                                                                    <div className="col-sm">
                                                                        <div className="font-weight-bold text-sm">Year Low</div>
                                                                    </div>
                                                                    <div className="col-sm text-sm">
                                                                        {this.state.yrlow}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md">
                                                                <div className="row justify-content-between">
                                                                    <div className="col-sm">
                                                                        <div className="font-weight-bold text-sm">Price/Earnings</div>
                                                                    </div>
                                                                    <div className="col-sm text-sm">
                                                                        {this.state.peratio}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row justify-content-between">
                                                            <div className="col-md">
                                                                <div className="row justify-content-between">
                                                                    <div className="col-sm">
                                                                        <div className="font-weight-bold text-sm">Year High</div>
                                                                    </div>
                                                                    <div className="col-sm text-sm">
                                                                        {this.state.yrhigh}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md">
                                                                <div className="row justify-content-between">
                                                                    <div className="col-sm">
                                                                        <div className="font-weight-bold text-sm">Sharpe Ratio</div>
                                                                    </div>
                                                                    <div className="col-sm text-sm">
                                                                        {this.state.sharpe}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <a className="text-xs d-flex align-items-center justify-content-between" href="javascript:void(0);">
                                                    More Stats
                                                    <i className="fas fa-long-arrow-alt-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4 mt-n10">
                                {/* Illustration card example*/}
                                <div class="card mb-4">
                                    <div class="card-header border-bottom">
                                        <ul class="nav nav-tabs card-header-tabs" id="cardTab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="overview-tab" href="#overview" data-toggle="tab" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="example-tab" href="#example" data-toggle="tab" role="tab" aria-controls="example" aria-selected="false">News</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="cardTabContent">
                                            <div class="tab-pane fade show active list-group list-group-flush" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                                <div className="list-group-item">
                                                    <h5>About</h5>
                                                    <p class="card-text text-xs">{this.state.companyInfo.about}</p>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row justify-content-between">
                                                        <div className="col">
                                                            <div className="card-title font-weight-bold text-sm">CEO</div>
                                                        </div>
                                                        <div className="col text-sm">
                                                            {this.state.companyInfo.ceo}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row justify-content-between">
                                                        <div className="col">
                                                            <div className="card-title font-weight-bold text-sm">Industry</div>
                                                        </div>
                                                        <div className="col text-sm">
                                                            {this.state.companyInfo.industry}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row justify-content-between">
                                                        <div className="col">
                                                            <div className="card-title font-weight-bold text-sm">Location</div>
                                                        </div>
                                                        <div className="col text-sm">
                                                            {this.state.companyInfo.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="example" role="tabpanel" aria-labelledby="example-tab">
                                                <NewsData newsData={this.state.newsData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            );
        }
    }
}







export default Stock;