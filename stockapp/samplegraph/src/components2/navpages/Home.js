import React from 'react';
import ChartComponent from '../../components/App'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        const tag = document.createElement("script");

        tag.inn
    }

    render(){
        return(
            <div class="homechart">
                <div class="middlechild headprice"></div>
                <div id="chart" class = "middlechild chartbody">
                    <ChartComponent />
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
