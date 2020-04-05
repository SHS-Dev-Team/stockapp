import React from 'react';
import ChartComponent from '../../components/App'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ticker: "AMZN",
            price: 340,
            trendpercent: 32,
            height: window.innerHeight,
            url: ""
        };
        this.handleResize = this.handleResize.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleResize(){
        this.setState({height: window.innerHeight});
    }
    handleChange(e){
        this.setState({url:e.target.value});
    }
    componentDidMount(){
        document.title="Home";
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    //<img src={this.state.trendcharge}></img>
    
    render(){
        return(
            <div class="homechart">
                <div class="middlechild headprice">
                    <header>
                        <h1 class="bigticker">{this.state.ticker}</h1>
                        <h1 class="bigprice">${this.state.price}</h1>
                        <h1 class="bigtrend">{this.state.trendpercent}%</h1>
                    </header>
                </div>
                <div id="chart" class = "middlechild chartbody">
                    <input type="text" value ={this.state.url} onChange={this.handleChange}></input>
                    <ChartComponent height={this.state.height/1.7} url="https://sandbox.iexapis.com/stable/stock/AMZN/chart/1y?format=csv&token=Tpk_1f76b2afcb3e466bb0ab9b034388e043"/>
                </div>
                <div class="middlechild stockinfo">
                    <div class = "about" id="about"></div>
                    <div class="stats"></div>
                </div>
            </div>
        );
    }
}

export default Home;

//https://sandbox.iexapis.com/stable/stock/AMZN/chart/1y?format=csv&token=Tpk_1f76b2afcb3e466bb0ab9b034388e043
//https://ksap1.github.io/unk/historicalamzn.csv