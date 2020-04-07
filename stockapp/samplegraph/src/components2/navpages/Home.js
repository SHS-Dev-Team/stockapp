import React from 'react';
import ChartComponent from '../../components/App'

class HeaderData extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price: 0,
            percentChange: 0,
            tic: this.props.tic
        }
        this.updateData = this.updateData.bind(this);
    }
    updateData(tic){
        this.setState({tic:tic});
        fetch(`https://sandbox.iexapis.com/stable/stock/${tic}/batch?types=quote&token=Tpk_1f76b2afcb3e466bb0ab9b034388e043`).then(
            response=>{
                if(!response.ok){
                    throw new Error("Couldn't find stock data");
                }
                return response.json();
            }
        )
        .then(data=>{
            this.setState({price: data.quote.latestPrice});
            this.setState({percentChange: data.quote.change});
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.tic!=this.props.tic){
            this.updateData(this.props.tic);
        }
    }


    componentDidMount(){
        this.updateData(this.state.tic);
    }

    render(){
        return(
            <header>
                <h1>{this.state.tic}</h1>
                <h1>${this.state.price}</h1>
                <h1>{this.state.percentChange}%</h1>  
            </header>
        );
    }
}


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            height: window.innerHeight,
            url: `https://sandbox.iexapis.com/stable/stock/${this.props.ticker}/chart/max?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv`,
            ticker: this.props.ticker 
        };
        this.handleResize = this.handleResize.bind(this);
    } 
    handleResize(){
        this.setState({height: window.innerHeight});
    }
    componentDidUpdate(prevProps){
        if(prevProps.ticker!=this.props.ticker){
            const tickle = this.props.ticker;
            this.setState({
                ticker: tickle,
                url: `https://sandbox.iexapis.com/stable/stock/${tickle}/chart/max?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv`
            });
        }
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
            <div className="homechart">
                <div className="middlechild headprice">
                    {!this.state.ticker ? "Choose a stock" : (<HeaderData tic = {this.state.ticker} />) }
                </div>
                <div id="chart" className = "middlechild chartbody">
                    {!this.state.ticker ? "": (<ChartComponent height={this.state.height/1.7} url={this.state.url}/>) }
                </div>
                <div className="middlechild stockinfo">
                    <div className = "about" id="about"></div>
                    <div className="stats"></div>
                </div>
            </div>
        );
    }
}

export default Home;

//https://sandbox.iexapis.com/stable/stock/AMZN/chart/1y?format=csv&token=Tpk_1f76b2afcb3e466bb0ab9b034388e043
//https://cloud.iexapis.com/stable/stock/fb/chart/2y?&token=pk_35a122993a8b4f21b4d39c2076ed034c&format=csv
//https://ksap1.github.io/unk/historicalamzn.csv