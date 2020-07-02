import React from 'react';
import UniqueImage from '../../../static/baseUI/img/undraw_posting_photo.svg';
import ChartComponent from '../../chart/ChartApp'

function formatPrice(price){
    const total  = price.toString();
    const len = total.indexOf('.');
    const dollar = total.substring(0,len).split('').reverse().join('');
    var newdollar = '';
    for(const num in dollar){
        if(num!=0 && num%3===0){
            newdollar = ','+newdollar;
        }
        newdollar=dollar[num]+newdollar;
    }
    const cent = total.substring(len+1,len+3);
    return '$'+newdollar+'.'+cent;
}

class FirstRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tic: '',
            companyName: '',
            latestPrice: '',
            changePercent: ''
        }
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(){
        this.setState({tic:this.props.tic});
        const link = `https://cloud.iexapis.com/stable/stock/${this.props.tic}/batch?types=quote&token=pk_35a122993a8b4f21b4d39c2076ed034c`
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
            this.setState({
                companyName: info.companyName,
                latestPrice: info.latestPrice,
                changePercent: info.changePercent
            });
        })
        .catch(err=>{
            const message = err.message;
            console.log(message);
            this.setState({err:message,found: false});
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
    render(){
        return (
            <div className="row">
                {/* Earnings (Monthly) Card Example  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Ticker</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.tic}</div>
                        <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">{this.state.companyName}</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Earnings (Monthly) Card Example  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Price</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{formatPrice(this.state.latestPrice)}</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                

                {/* Pending Requests Card Example  */ }
                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Today</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.changePercent}%</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-comments fa-2x text-gray-300"></i>
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
        this.state={}
    }
    render(){
        return (
        <div className="row">

                        {/* Area Chart  */ }
                        <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown  */ }
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
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
                        </div>

                        {/* Pie Chart  */ }
                        <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown  */ }
                            
                        </div>
                        </div>
                    </div>
        );
    }
}


function Home(props){
    if(props.tic.length===0){
        return(
            <h1 className="h3 mb-0 text-gray-800" style={{marginLeft:"3%"}}><span className ="colorgrad" display="inline" kind="animated">Select a stock from above</span></h1>
        );
    }
    else{
        return(
            <div className="container-fluid">

                {/* Content Row  */ }
                <FirstRow tic={props.tic} />

                {/* Content Row  */ }

                <SecondRow url={props.url}/>

                {/* Content Row  */ }
                

                </div>
        );
    }
}

export default Home;