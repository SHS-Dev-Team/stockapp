import React from 'react';
import UniqueImage from '../../../static/baseUI/img/undraw_posting_photo.svg';
import ChartComponent from '../../chart/ChartApp'

function formatPrice(price){
    const total  = price.toString();
    const len = total.indexOf('.');
    if(len===-1){
        return '$'+total+'.00'
    }
    const dollar = total.substring(0,len).split('').reverse().join('');
    var newdollar = '';
    for(const num in dollar){
        if(num!=0 && num%3===0){
            newdollar = ','+newdollar;
        }
        newdollar=dollar[num]+newdollar;
    }
    var cent = total.substring(len+1,len+3);
    if(cent.length===1){
        cent+="0";
    }
    return '$'+newdollar+'.'+cent;
}

class FirstRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row">   {/* heading data */ }
                {/* Ticker  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Ticker</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.data.tic}</div>
                        <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{this.props.data.companyName}</div>
                        </div>
                        <div className="col-auto">
                        <i class="fas fa-building fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Price  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Price</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{formatPrice(this.props.data.latestPrice)}</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                

                {/* 24hr price change  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Today</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.data.changePercent}%</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-percentage fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

class SecondRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.newsData);
        return (
            <div className="card shadow mb-4">     {/*Price Chart*/ }
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Chart</h6>
                    <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                {/* Card Body  */ }
                <div className="card-body">
                    <div className="chart-area">
                        <ChartComponent height={320} url={this.props.url}/>
                        {/* <canvas id="myAreaChart"></canvas> */}
                    </div>
                </div>
            </div>     
        );
    }
}


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ready: false,
            error: false,
            newsData:[]
        }
        this.fetchData= this.fetchData.bind(this);
    }
    fetchData(){
        {/* Fetch ticker stats */ }
        const link = `https://cloud.iexapis.com/stable/stock/${this.props.tic}/batch?types=quote,news&token=pk_35a122993a8b4f21b4d39c2076ed034c`
        fetch(link)
        .then(response=>{
            if(response.ok){
                const th = response.json();
                return th;
            }
            else{
                throw new Error("Could not fetch")
            }
        })
        .then(data=>{
            console.log("loaded");
            const info = data.quote;
            const news = data.news;
            this.setState({
                newsData:[]
            });
            this.setState({
                headerData: {
                    tic: this.props.tic,
                    companyName: info.companyName,
                    latestPrice: info.latestPrice,
                    changePercent: info.changePercent
                },
                yrhigh: info.week52High,
                yrlow: info.week52Low,
                peratio: info.peRatio
            });
            for(var newsVar of news){
                this.setState(state=>{
                    state.newsData.push(newsVar);
                });
            }
            
        })
        .catch(err=>{
            const message = err.message;
            console.log(message);
            this.setState({err:message,found: false});
        });
        {/* Fetch company about info */ }
        const second = `https://cloud.iexapis.com/stable/stock/${this.props.tic}/company?token=pk_35a122993a8b4f21b4d39c2076ed034c`
        fetch(second)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            this.setState({
                about: data.description
            })
        });

        {/* Fetch sharpe ratio from backend */ }
        fetch(`api/stats?tic=${this.props.tic}`,{
            method:"GET"
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            this.setState({
                sharpe: data.sharpe,
                std: data.std,
                ready: true
            })
        });
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProps){
        if(prevProps.tic!==this.props.tic){
            this.fetchData();
        }
    }
    static getDerivedStateFromError(error) {
		console.log(error);
		return { error: true };
	}
    render(){
        if(this.props.tic.length===0 || !this.state.ready){
            return(
                <div>
                    <i class="icon-spinner icon-spin icon-medium"></i><h1 className="h3 mb-0 text-gray-800" style={{marginLeft:"3%",textAlign:"center",top:"100px"}}><span className ="colorgrad" display="inline" kind="animated">Select a stock from above</span></h1>
                </div>
            );
        }
        else{
            return(
                <div className="container-fluid">
    
                   
                    <FirstRow tic={this.props.tic} data={this.state.headerData} />
                    <div className="row">
                    <div className="col-lg-6 mb-4">
                        <SecondRow url={this.props.url} />

                        <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">About</h6>
                                </div>
                                <div className="card-body">
                                    {this.state.about}2
                                </div>
                            </div>
                        </div>
                        
    
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Stats</h6>
                                </div>
                                    <div className="card-body">
                                        <h4 className="small font-weight-bold">Sharpe Ratio<span className="float-right">{this.state.sharpe}</span></h4> 
                                        <h4 className="small font-weight-bold">Standard Deviation<span className="float-right">{this.state.std}</span></h4>
                                        <h4 className="small font-weight-bold">52 Week High <span className="float-right">${this.state.yrhigh}</span></h4>
                                        <h4 className="small font-weight-bold">52 Week Low<span className="float-right">${this.state.yrlow}</span></h4>
                                        <h4 className="small font-weight-bold">Price to Earnings Ratio<span className="float-right">{this.state.peratio}</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <NewsData newsData={this.state.newsData} />
                    </div>
                    </div>
                    </div>
                    
            );
        }
        
    }
}

export default Home;