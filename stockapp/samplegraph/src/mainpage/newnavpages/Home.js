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
        this.state={
            url: ''
        }
    }
    componentDidMount(){
        this.setState({
            url: this.props.url
        })
    }
    componentDidUpdate(prevProps){
        if(prevProps.url!==this.props.url){
            this.setState({
                url: this.props.url
            })
        }
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
                                <ChartComponent height={320} url={this.state.url}/>
                                {/* <canvas id="myAreaChart"></canvas> */}
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Pie Chart  */ }
                        <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            {/* Card Header - Dropdown  */ }
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Latest News</h6>
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
                <div className="row">

                    {/* Content Column  */ }
                    <div className="col-lg-6 mb-4">

                    {/* Project Card Example  */ }
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                        </div>
                        <div className="card-body">
                        <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                        <div className="progress mb-4">
                            <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                        <div className="progress mb-4">
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                        <div className="progress mb-4">
                            <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                        <div className="progress mb-4">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>
                    </div>

                    {/* Color System  */ }
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-primary text-white shadow">
                            <div className="card-body">
                            Primary
                            <div className="text-white-50 small">#4e73df</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-success text-white shadow">
                            <div className="card-body">
                            Success
                            <div className="text-white-50 small">#1cc88a</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-info text-white shadow">
                            <div className="card-body">
                            Info
                            <div className="text-white-50 small">#36b9cc</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-warning text-white shadow">
                            <div className="card-body">
                            Warning
                            <div className="text-white-50 small">#f6c23e</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-danger text-white shadow">
                            <div className="card-body">
                            Danger
                            <div className="text-white-50 small">#e74a3b</div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                        <div className="card bg-secondary text-white shadow">
                            <div className="card-body">
                            Secondary
                            <div className="text-white-50 small">#858796</div>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                    {/* Illustrations  */ }
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                        </div>
                        <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src={UniqueImage} alt=""></img>
                        </div>
                        <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                        <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw &rarr;</a>
                        </div>
                    </div>

                    {/* Approach  */ }
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                        </div>
                        <div className="card-body">
                        <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                        <p className="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
                        </div>
                    </div>

                    </div>
                </div>

                </div>
        );
    }
}

export default Home;