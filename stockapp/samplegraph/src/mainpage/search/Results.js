import React from 'react';
function Listing(props){
    const theobj = `{
        "autoWidth": "false",
        "colorTheme": "dark",
        "stockSymbol": "uber",
        "width": "400",
        "apiToken": "pk_35a122993a8b4f21b4d39c2076ed034c"
        }`
    return(
        <div>
            <div id="root:iex-widget"></div>
            <script id="iex-widget-script-tag" type="text/javascript" src="https://storage.googleapis.com/iexcloud-hl37opg/static/single-ticker.bundle.js">
                JSON.parse({theobj})
            </script>
        </div>
    )
}
class Result extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state={
            found: false,
            data: [],
            err: ""
        }
        this.changeChart = this.changeChart.bind(this);
    }
    componentDidUpdate(prevProps){
        this._isMounted=true;
        if(prevProps.search!=this.props.search){
            
            const link = `https://sandbox.iexapis.com/stable/search/${this.props.search}?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043`;

            fetch(link)
            .then(response=>{
                if(this._isMounted && response.ok){
                    const th = response.json();
                    console.log(th);
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
    otherStockData(tick){
        const link = `https://cloud.iexapis.com/stable/stock/${tick}/batch?types=quote&token=pk_35a122993a8b4f21b4d39c2076ed034c`
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    changeChart(tic){
        this.props.func(tic);
    }
    render(){
        return(
            <ul className="stocklist"> 
                {  
                    this.state.found ?
                    this.state.data.map(obj=>{
                        const symb = obj.symbol;
                        return (
                            <li className="stocklist-item" key={symb}>
                                <button className = "stocklist-button" onClick={()=> this.changeChart(symb)}>{symb}</button>
                            </li>
                        );
                    })
                    : this.state.err  
                }
            </ul> 
        )
    }
}
/*
<div id="root:iex-widget" dangerouslySetInnerHTML="<script id='iex-widget-script-tag' type='text/javascript' src='https://storage.googleapis.com/iexcloud-hl37opg/static/single-ticker.bundle.js'>
                                {
                                    'autoWidth': 'false',
                                    'colorTheme': 'light',
                                    'stockSymbol': 'uber',
                                    'width': '400',
                                    'apiToken': 'Tpk_1f76b2afcb3e466bb0ab9b034388e043'
                                }
                                </script>"></div>
    */
export default Result;